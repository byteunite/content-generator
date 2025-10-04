'use node'

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { cleanJson } from './helpers';
import { internal } from './_generated/api';

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

1. Analyze the image to identify: style, layout, colors, main objects, decorative elements, text placement
2. Create a concise, single-paragraph prompt with [placeholder_name] for all replaceable elements
3. Write placeholders for: colors, main objects, themes, decorative elements, and all text content

## Output Format

Return your response as a JSON object with exactly 2 fields:
{
  "title": "Short, concise, engaging title describing the design style",
  "prompt": "Example: Create a creative collage design in a modern style with [primary_color] as the dominant color, featuring [main_object] in the center as the focal point, surrounded by decorative elements themed around [theme_topic] such as [decorative_element_1], [decorative_element_2], and [decorative_element_3]. Use a thick white frame around the elements to give a neat impression. Add title text [title_text] at the bottom and smaller text [subtitle_text] beneath it. The composition follows the reference poster layout (solid-color background, white frame, main object centered, decorative elements scattered)."
}

## Guidelines

- Title: 3-6 words, capture the design essence
- Prompt: 1-2 paragraphs max, concise and actionable
- Use [placeholder_name] format (snake_case) for all replaceable content (no bold, no markdown)
- Include specific layout and composition details
- Write prompt in natural, flowing language (can use Indonesian or English based on context)
- Make it immediately usable as a template
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
      ctx.runMutation(internal.template.updateResult, {
        storageId,
        result: {
          status: "failed"
        }
      })
    }
  }
})

