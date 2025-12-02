#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Living Library System - Dark Academia Tech
 * A dynamic, evolving library system that grows and adapts
 * with dark academia aesthetics and magical book management
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class LivingLibrary {
  constructor(libraryPath) {
    this.libraryPath = libraryPath;
    this.books = new Map();
    this.sections = new Map();
    this.readers = new Map();
    this.annotations = new Map();
  }

  // Add a book to the library
  addBook(book) {
    const bookId = book.id || `book-${Date.now()}`;
    const bookData = {
      id: bookId,
      title: book.title,
      author: book.author || 'Unknown',
      category: book.category || 'general',
      tags: book.tags || [],
      content: book.content,
      added: new Date().toISOString(),
      lastRead: null,
      readCount: 0,
      annotations: [],
      connections: [],
      darkAcademia: {
        aesthetic: 'gothic-academic',
        mood: 'scholarly-mysterious',
        lighting: 'candlelit',
        atmosphere: 'ancient-wisdom'
      }
    };
    
    this.books.set(bookId, bookData);
    this.organizeBook(bookData);
    return bookData;
  }

  // Organize book into sections
  organizeBook(book) {
    const section = book.category || 'general';
    if (!this.sections.has(section)) {
      this.sections.set(section, {
        name: section,
        books: [],
        aesthetic: 'dark-academic',
        description: `Section for ${section} books`
      });
    }
    
    this.sections.get(section).books.push(book.id);
  }

  // Add annotation to a book
  annotate(bookId, annotation) {
    if (!this.books.has(bookId)) {
      throw new Error(`Book not found: ${bookId}`);
    }
    
    const book = this.books.get(bookId);
    const annotationData = {
      id: `annotation-${Date.now()}`,
      text: annotation.text,
      page: annotation.page || null,
      timestamp: new Date().toISOString(),
      reader: annotation.reader || 'anonymous',
      connections: annotation.connections || []
    };
    
    book.annotations.push(annotationData);
    book.lastRead = new Date().toISOString();
    book.readCount++;
    
    return annotationData;
  }

  // Connect books together
  connectBooks(bookId1, bookId2, connectionType = 'related') {
    if (!this.books.has(bookId1) || !this.books.has(bookId2)) {
      throw new Error('One or both books not found');
    }
    
    const book1 = this.books.get(bookId1);
    const book2 = this.books.get(bookId2);
    
    if (!book1.connections.find(c => c.bookId === bookId2)) {
      book1.connections.push({
        bookId: bookId2,
        type: connectionType,
        created: new Date().toISOString()
      });
    }
    
    if (!book2.connections.find(c => c.bookId === bookId1)) {
      book2.connections.push({
        bookId: bookId1,
        type: connectionType,
        created: new Date().toISOString()
      });
    }
  }

  // Find books by query
  search(query) {
    const results = [];
    const queryLower = query.toLowerCase();
    
    for (const book of this.books.values()) {
      if (
        book.title.toLowerCase().includes(queryLower) ||
        book.author.toLowerCase().includes(queryLower) ||
        book.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
        (book.content && book.content.toLowerCase().includes(queryLower))
      ) {
        results.push(book);
      }
    }
    
    return results;
  }

  // Get library statistics
  getStats() {
    return {
      totalBooks: this.books.size,
      totalSections: this.sections.size,
      totalAnnotations: Array.from(this.books.values()).reduce((sum, book) => sum + book.annotations.length, 0),
      totalConnections: Array.from(this.books.values()).reduce((sum, book) => sum + book.connections.length, 0),
      mostRead: Array.from(this.books.values())
        .sort((a, b) => b.readCount - a.readCount)
        .slice(0, 5)
        .map(b => ({ title: b.title, readCount: b.readCount }))
    };
  }

  // Save library to disk
  save() {
    const libraryData = {
      meta: {
        name: 'Living Library',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        darkAcademia: {
          aesthetic: 'gothic-academic',
          theme: 'ancient-wisdom',
          atmosphere: 'scholarly-mysterious'
        }
      },
      books: Array.from(this.books.values()),
      sections: Array.from(this.sections.values()),
      stats: this.getStats()
    };
    
    const outputDir = path.dirname(this.libraryPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(this.libraryPath, JSON.stringify(libraryData, null, 2), 'utf-8');
    return libraryData;
  }

  // Load library from disk
  load() {
    if (!fs.existsSync(this.libraryPath)) {
      return null;
    }
    
    const libraryData = JSON.parse(fs.readFileSync(this.libraryPath, 'utf-8'));
    
    // Restore books
    for (const book of libraryData.books || []) {
      this.books.set(book.id, book);
    }
    
    // Restore sections
    for (const section of libraryData.sections || []) {
      this.sections.set(section.name, section);
    }
    
    return libraryData;
  }
}

async function createLivingLibrary(libraryPath = null) {
  if (!libraryPath) {
    libraryPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'living-library.json');
  }
  
  const library = new LivingLibrary(libraryPath);
  library.load();
  
  console.log('📚 Living Library System initialized');
  console.log(`   Library path: ${libraryPath}`);
  
  return library;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createLivingLibrary().then(library => {
    console.log('✅ Living Library created');
    console.log(`   Stats:`, library.getStats());
  }).catch(console.error);
}

export { LivingLibrary, createLivingLibrary };
export default createLivingLibrary;

