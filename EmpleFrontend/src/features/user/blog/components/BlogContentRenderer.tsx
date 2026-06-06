'use client';

import React from 'react';

// Future-proofing for structured content blocks
export type ContentBlockType = 'paragraph' | 'heading' | 'image' | 'quote' | 'code' | 'list';

export interface ContentBlock {
  type: ContentBlockType;
  content: string; // The text, URL, or code
  metadata?: any;  // Extra info like language for code, alt text for image
}

interface Props {
  // Currently we receive a single raw string from the backend,
  // but we structure the renderer to accept blocks in the future.
  rawContent?: string;
  blocks?: ContentBlock[];
}

export default function BlogContentRenderer({ rawContent, blocks }: Props) {
  // If we have structured blocks (future API)
  if (blocks && blocks.length > 0) {
    return (
      <div className="blog-rich-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {blocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <h2 key={index} style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', marginTop: '48px', marginBottom: '16px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{block.content}</h2>;
            case 'image':
              return (
                <figure key={index} style={{ margin: '40px 0' }}>
                  <img src={block.content} alt={block.metadata?.alt || 'Article image'} style={{ width: '100%', borderRadius: '16px', display: 'block' }} />
                  {block.metadata?.caption && <figcaption style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)', marginTop: '16px' }}>{block.metadata.caption}</figcaption>}
                </figure>
              );
            case 'quote':
              return (
                <blockquote key={index} style={{ borderLeft: '4px solid var(--orange)', paddingLeft: '24px', margin: '32px 0', fontSize: '24px', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6 }}>
                  {block.content}
                </blockquote>
              );
            case 'code':
              return (
                <pre key={index} style={{ background: '#111111', color: '#e5e5e5', padding: '24px', borderRadius: '12px', overflowX: 'auto', fontSize: '15px', fontFamily: "monospace", border: '1px solid var(--border)' }}>
                  <code>{block.content}</code>
                </pre>
              );
            case 'list':
              return (
                <ul key={index} style={{ paddingLeft: '24px', margin: '20px 0', listStyleType: 'disc', fontSize: '18px', lineHeight: 1.9, color: 'var(--text)' }}>
                  {block.content.split('\n').map((item, i) => <li key={i} style={{ marginBottom: '12px' }}>{item}</li>)}
                </ul>
              );
            case 'paragraph':
            default:
              return <p key={index} style={{ fontSize: '18px', lineHeight: 1.9, color: 'var(--text)', marginBottom: 0 }}>{block.content}</p>;
          }
        })}
      </div>
    );
  }

  // Fallback for current raw text content
  if (rawContent) {
    return (
      <div className="blog-rich-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {rawContent.split('\n\n').map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          return (
            <p key={index} style={{ fontSize: '18px', lineHeight: 1.9, color: 'var(--text)', marginBottom: 0 }}>
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
}
