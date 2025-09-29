import React from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'

const items = [
  { id: 1, title: 'Template 1', image: '/vite.svg', desc: 'Quick start template' },
  { id: 2, title: 'Template 2', image: '/vite.svg', desc: 'Marketing template' },
  { id: 3, title: 'Template 3', image: '/vite.svg', desc: 'Blog template' },
  { id: 4, title: 'Template 4', image: '/vite.svg', desc: 'Portfolio template' },
]

const Templates: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Templates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <Card key={it.id}>
            <div className="w-full overflow-hidden rounded-t-md">
              <img
                src={it.image}
                alt={it.title}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
              />
            </div>
            <CardHeader>
              <CardTitle>{it.title}</CardTitle>
              <CardDescription>{it.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">A short preview of the template.</p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm">Use</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;