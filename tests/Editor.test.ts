/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import Editor from '../src/Editor';
import jsonData from '../md-json-converter/test/json.json'

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'mock-url');
  
  global.fetch = vi.fn(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: 1, file: { url: 'https://example.com/image.jpg' } }),
    })
  ) as any;
});

describe('Editor', () => {
  it('should be defined', () => {
    expect(Editor).toBeDefined();
  });
  
  it('should render in view mode', () => {
    const props = {
      onDataChange: vi.fn(),
      data: jsonData,
      setData: vi.fn(),
      uploadEndPoint: '/upload',
      isEditMode: false,
      locale: 'en'
    };
    
    const { container } = render(React.createElement(Editor, props));
    expect(container.firstChild).toBeDefined();
  });
});
