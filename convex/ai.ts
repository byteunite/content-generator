'use node'

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { cleanJson } from './helpers';
import { internal } from './_generated/api';
import process from 'process';

type AnalyzeImageResult = {
  title: string;
  prompt: string;
}

export const analyzeImage = internalAction({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    try {
      // Fetch the file from storage
      const file = await ctx.storage.get(storageId)

      if (!file) {
        throw new Error("File not found");
      }
      if (!file.type.startsWith("image/")) {
        throw new Error("File is not an image");
      }

      const system = `
# Image Analysis & Design Prompt Generator

You are a prompt engineer and artist. Analyze the given image and create a design prompt template with replaceable placeholders.

## Instructions

1. Analyze the image to identify: style, layout, colors, objects, decorative elements, text placement, and composition details (e.g., aspect ratio, focal points).
2. Create a concise prompt (1-2 paragraphs max) with [placeholder_name] for all replaceable elements.
3. Write placeholders for: colors, objects, themes, decorative elements, fonts, lighting, backgrounds, and all text content. Ensure placeholders cover all variable elements in the image, including any not explicitly listed. If an element is fixed, describe it directly without a placeholder.

## Output Format

Return your response as a JSON object with exactly 2 fields:
{
  "title": "Short, concise, engaging title describing the design style",
  "prompt": "Example: Create a [style] design with [primary_color] background, featuring [main_subject] as the centerpiece, accented by [decorative_elements] themed around [theme]. Position [text_elements] at [location], using [font_style] for readability. Maintain [layout_details] from the reference image."
}

## Guidelines

- Title: 3-6 words, capture the design essence
- Prompt: 1-2 paragraphs max, concise and actionable
- Use [placeholder_name] format (snake_case) for all replaceable content (no bold, no markdown)
- Include specific layout and composition details
- Write prompt in natural, flowing English
- Make it immediately usable as a template
- The image is a design reference, not the final output; objects and elements can be replaced with alternatives
`;
      const prompt = `Analyze the following image and generate a design prompt template with placeholders as per the instructions.`;

      console.log("Analyzing image with AI...", { system, prompt, file, fileType: file.type });

      console.time("AI analyze image")
      const response = await generateText({
        model: google('gemini-2.5-flash'),
        messages: [
          {
            role: 'system',
            content: system
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image', image: await file.arrayBuffer(), mediaType: file.type }
            ]
          },
        ]
      });
      console.timeEnd("AI analyze image")

      console.log("AI usage:", response.usage)
      console.log("AI Response Metadata:", response.providerMetadata);

      const data = cleanJson<AnalyzeImageResult>(response.text)

      await ctx.runMutation(internal.template.updateResult, {
        storageId,
        result: {
          title: data.title,
          prompt: data.prompt,
          status: "completed"
        }
      })
    } catch (error) {
      console.error("Error analyzing image:", error)
      await ctx.runMutation(internal.template.updateResult, {
        storageId,
        result: {
          status: "failed"
        }
      })
    }
  }
})

export const generatePrompt = internalAction({
  args: {
    basePrompt: v.string(),
    baseImageUrl: v.string(),
    topic: v.string(),
    outputId: v.id("outputs"),
  },
  handler: async (ctx, { basePrompt, baseImageUrl, topic, outputId }) => {
    try {
      const prompt = `I want to create a social media post with topic: ${topic}. 
please adjust the prompt below to fill the placeholder based on above topic: ${basePrompt}.
please only respond with the final prompt without any additional explanation.`;

      console.time("AI generate prompt")
      const response = await generateText({
        model: google('gemini-2.5-flash'),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image', image: baseImageUrl }
            ]
          }
        ]
      });
      console.timeEnd("AI generate prompt")

      console.log("Generated prompt:")
      console.log(response.text)

      await ctx.runMutation(internal.output.updateResult, {
        outputId,
        result: {
          prompt: response.text,
          status: 'prompt_generated',
        }
      })
    } catch (error) {
      console.log("Error generating prompt:");
      console.error(error);

      await ctx.runMutation(internal.output.updateResult, {
        outputId,
        result: {
          status: 'failed'
        }
      })
    }
  }
})

export const generateImage = internalAction({
  args: {
    prompt: v.string(),
    baseImageUrl: v.string(),
    outputId: v.id("outputs"),
  },
  handler: async (ctx, { prompt, baseImageUrl, outputId }) => {
    try {
      const response = await fetch('https://ark.ap-southeast.bytepluses.com/api/v3/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MODEL_ARK_API_KEY}`
        },
        body: JSON.stringify({
          model: "seedream-4-0-250828",
          prompt: "Please create new image based on the image and this prompt: " + prompt,
          image: baseImageUrl,
          sequential_image_generation: "disabled",
          response_format: "url",
          size: "1k",
          stream: false,
          watermark: false
        })
      });

      if (!response.ok) {
        throw await response.json()
      }

      const { data } = await response.json() as { data: { url: string }[] }
      
      
      if (!data || data.length === 0) {
        throw new Error("No image generated");
      }

      // Download the image
      const imageResponse = await fetch(data[0].url);
      const image = await imageResponse.blob();

      // Store the image in Convex
      const storageId = await ctx.storage.store(image);

      await ctx.runMutation(internal.output.updateResult, {
        outputId,
        result: {
          status: 'image_generated',
          storageId
        }
      })
    } catch (error) {
      console.log("Error generating image:");
      console.error(error);

      await ctx.runMutation(internal.output.updateResult, {
        outputId,
        result: {
          status: 'failed'
        }
      })
    }
  }
})