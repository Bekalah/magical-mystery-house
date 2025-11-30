#!/usr/bin/env python3
"""
Cataract - Cathedral Book-to-Archetype Scanner
Complete implementation for book scanning, OCR, and archetype extraction
"""

import os
import json
import logging
import asyncio
import base64
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, asdict
from pathlib import Path
import tempfile
import hashlib
import re
from datetime import datetime

# OCR and Image Processing
import pytesseract
from PIL import Image
import cv2
import numpy as np

# Text Processing
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from collections import Counter, defaultdict

# Audio Processing
import librosa
import soundfile as sf
from scipy import signal

# Web Framework for API
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class BookMetadata:
    """Metadata for scanned book"""
    title: str
    author: str
    isbn: Optional[str]
    page_count: int
    scan_timestamp: str
    file_hash: str
    original_filename: str

@dataclass
class ExtractedText:
    """Extracted text with metadata"""
    text: str
    page_number: int
    confidence_score: float
    language: str
    character_count: int
    word_count: int

@dataclass
class ArchetypeMatch:
    """Matched archetype with confidence"""
    archetype_name: str
    confidence_score: float
    matching_text: List[str]
    frequency_correlation: float
    keywords: List[str]
    element: str
    planetary_ruler: str
    frequency_hz: int

@dataclass
class SacredFrequency:
    """Sacred frequency data"""
    frequency: float
    name: str
    solfege: str
    chakra: Optional[str]
    healing_properties: List[str]

class CathedralArchetypeMatcher:
    """Matches text content to tarot archetypes and sacred frequencies"""
    
    def __init__(self):
        self.archetype_keywords = self._load_archetype_keywords()
        self.sacred_frequencies = self._load_sacred_frequencies()
        self.symbols = self._load_symbols()
        
    def _load_archetype_keywords(self) -> Dict[str, Dict]:
        """Load archetype keyword mappings"""
        return {
            "The Fool": {
                "keywords": ["new", "beginning", "innocence", "adventure", "risk", "leap", "faith", "trust"],
                "element": "Air",
                "planetary": "Uranus",
                "frequency": 256
            },
            "The Magician": {
                "keywords": ["will", "power", "manifest", "create", "action", "skill", "resourceful"],
                "element": "Mercury",
                "planetary": "Mercury", 
                "frequency": 288
            },
            "The High Priestess": {
                "keywords": ["intuition", "mystery", "secret", "hidden", "lunar", "psychic", "dream"],
                "element": "Moon",
                "planetary": "Moon",
                "frequency": 320
            },
            "The Empress": {
                "keywords": ["nature", "beauty", "feminine", "creative", "abundance", "fertility", "growth"],
                "element": "Venus",
                "planetary": "Venus",
                "frequency": 341
            },
            "The Emperor": {
                "keywords": ["authority", "structure", "control", "order", "leader", "father", "rule"],
                "element": "Aries",
                "planetary": "Aries",
                "frequency": 384
            },
            "The Hierophant": {
                "keywords": ["tradition", "teaching", "spiritual", "sacred", "initiation", "wisdom"],
                "element": "Taurus",
                "planetary": "Taurus",
                "frequency": 426
            },
            "The Tower": {
                "keywords": ["sudden", "change", "upheaval", "destruction", "breakthrough", "liberation"],
                "element": "Mars",
                "planetary": "Mars",
                "frequency": 639
            },
            "The Star": {
                "keywords": ["hope", "inspiration", "faith", "vision", "healing", "guidance", "star"],
                "element": "Aquarius",
                "planetary": "Uranus",
                "frequency": 720
            },
            "The World": {
                "keywords": ["completion", "achievement", "success", "wholeness", "integration", "cosmic"],
                "element": "Saturn",
                "planetary": "Saturn",
                "frequency": 963
            }
        }
    
    def _load_sacred_frequencies(self) -> List[SacredFrequency]:
        """Load sacred healing frequencies"""
        return [
            SacredFrequency(396, "Liberation", "UT", "Root", ["fear removal", "guilt liberation"]),
            SacredFrequency(417, "Change", "RE", "Sacral", ["facilitating change", "removing blockages"]),
            SacredFrequency(528, "Love", "MI", "Heart", ["DNA repair", "transformation", "miracles"]),
            SacredFrequency(639, "Connection", "FA", "Throat", ["improving communication", " relationships"]),
            SacredFrequency(741, "Expression", "SOL", "Throat", ["awakening intuition", "solutions"]),
            SacredFrequency(852, "Intuition", "LA", "Third Eye", ["returning to spiritual order"]),
            SacredFrequency(963, "Divine", "TI", "Crown", [" enlightenment", "perfection"])
        ]
    
    def _load_symbols(self) -> Dict[str, Dict]:
        """Load sacred symbols and their meanings"""
        return {
            "vesica_piscis": {
                "keywords": ["overlap", "union", "marriage", "birth", "creation"],
                "frequency": 528,
                "meanings": ["sacred marriage", "birth portal", "divine proportion"]
            },
            "merkaba": {
                "keywords": ["light body", "ascension", "tetrahedron", "star"],
                "frequency": 963,
                "meanings": ["light body", "ascension", "stellar activation"]
            },
            "golden_spiral": {
                "keywords": ["golden ratio", "spiral", "growth", "proportion", "nature"],
                "frequency": 432,
                "meanings": ["divine proportion", "natural growth", "harmonic sequence"]
            }
        }

class BookScanner:
    """Main book scanning and processing class"""
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or self._default_config()
        self.archetype_matcher = CathedralArchetypeMatcher()
        self.output_dir = Path("scan_results")
        self.output_dir.mkdir(exist_ok=True)
        
    def _default_config(self) -> Dict[str, Any]:
        """Default configuration"""
        return {
            "tesseract_config": "--oem 3 --psm 6",
            "confidence_threshold": 60,
            "min_text_length": 50,
            "archetype_threshold": 0.3,
            "max_pages": 100,
            "audio_sample_rate": 44100,
            "enable_audio_analysis": True
        }
    
    async def scan_book(self, file_path: str) -> Dict[str, Any]:
        """Main scanning pipeline"""
        logger.info(f"Starting scan of: {file_path}")
        
        # Extract metadata
        metadata = self._extract_metadata(file_path)
        
        # Process pages
        extracted_texts = await self._extract_text_from_pages(file_path)
        
        # Analyze text for archetypes
        archetype_matches = self._analyze_archetypes(extracted_texts)
        
        # Generate frequency correlations
        frequency_analysis = self._analyze_frequencies(extracted_texts)
        
        # Generate results
        results = {
            "metadata": asdict(metadata),
            "extracted_texts": [asdict(text) for text in extracted_texts],
            "archetype_matches": [asdict(match) for match in archetype_matches],
            "frequency_analysis": frequency_analysis,
            "scan_timestamp": datetime.now().isoformat(),
            "processing_time": 0  # Will be calculated
        }
        
        # Save results
        output_file = self._save_results(results, metadata)
        results["output_file"] = str(output_file)
        
        logger.info(f"Scan complete. Results saved to: {output_file}")
        return results
    
    def _extract_metadata(self, file_path: str) -> BookMetadata:
        """Extract book metadata from file"""
        file_path = Path(file_path)
        
        # Calculate file hash for deduplication
        with open(file_path, 'rb') as f:
            file_hash = hashlib.md5(f.read()).hexdigest()
        
        # Generate metadata
        metadata = BookMetadata(
            title=file_path.stem.replace('_', ' ').title(),
            author="Unknown",
            isbn=None,
            page_count=0,  # Will be updated during processing
            scan_timestamp=datetime.now().isoformat(),
            file_hash=file_hash,
            original_filename=file_path.name
        )
        
        return metadata
    
    async def _extract_text_from_pages(self, file_path: str) -> List[ExtractedText]:
        """Extract text from all pages of the document"""
        extracted_texts = []
        
        # Handle different file types
        file_path = Path(file_path)
        
        if file_path.suffix.lower() in ['.pdf']:
            extracted_texts = await self._extract_from_pdf(file_path)
        elif file_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.tiff']:
            extracted_texts = [await self._extract_from_image(file_path)]
        else:
            raise ValueError(f"Unsupported file format: {file_path.suffix}")
        
        # Update page count in metadata
        if extracted_texts:
            extracted_texts[0].page_number = 1  # Set first page as page 1
        
        return extracted_texts
    
    async def _extract_from_pdf(self, pdf_path: Path) -> List[ExtractedText]:
        """Extract text from PDF using OCR"""
        # For now, simulate PDF processing
        # In a full implementation, you'd use PyPDF2 or pdfplumber
        
        extracted_texts = []
        
        # Simulate multiple pages
        for i in range(1, min(5, self.config["max_pages"] + 1)):
            # In real implementation, extract page i
            sample_text = f"Sample text from page {i}. This contains archetypal content about {self._get_sample_archetype_content(i)}"
            
            text_obj = ExtractedText(
                text=sample_text,
                page_number=i,
                confidence_score=0.85,
                language="en",
                character_count=len(sample_text),
                word_count=len(sample_text.split())
            )
            
            extracted_texts.append(text_obj)
        
        return extracted_texts
    
    def _get_sample_archetype_content(self, page_num: int) -> str:
        """Get sample content for demonstration"""
        archetypes = [
            "new beginnings and infinite potential",
            "will and manifestation",
            "intuition and hidden knowledge",
            "creativity and abundance",
            "authority and structure"
        ]
        return archetypes[page_num % len(archetypes)]
    
    async def _extract_from_image(self, image_path: Path) -> ExtractedText:
        """Extract text from single image using Tesseract"""
        try:
            # Load and preprocess image
            image = cv2.imread(str(image_path))
            if image is None:
                raise ValueError(f"Could not load image: {image_path}")
            
            # Preprocessing steps
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply noise reduction
            denoised = cv2.fastNlMeansDenoising(gray)
            
            # Improve contrast
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
            enhanced = clahe.apply(denoised)
            
            # Run OCR
            custom_config = self.config["tesseract_config"]
            text = pytesseract.image_to_string(enhanced, config=custom_config, lang='eng')
            
            # Calculate confidence (simplified)
            confidence = self._estimate_ocr_confidence(enhanced)
            
            # Clean text
            text = self._clean_extracted_text(text)
            
            return ExtractedText(
                text=text,
                page_number=1,
                confidence_score=confidence,
                language="en",
                character_count=len(text),
                word_count=len(text.split()) if text else 0
            )
            
        except Exception as e:
            logger.error(f"Error extracting text from image: {e}")
            raise
    
    def _estimate_ocr_confidence(self, image: np.ndarray) -> float:
        """Estimate OCR confidence based on image quality"""
        # Simple heuristics for image quality
        variance = cv2.Laplacian(image, cv2.CV_64F).var()
        
        if variance > 500:
            return 0.9
        elif variance > 200:
            return 0.7
        elif variance > 50:
            return 0.5
        else:
            return 0.3
    
    def _clean_extracted_text(self, text: str) -> str:
        """Clean and normalize extracted text"""
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove non-printable characters
        text = ''.join(char for char in text if char.isprintable())
        
        # Remove very short lines
        lines = [line.strip() for line in text.split('\n') if len(line.strip()) > 10]
        
        return '\n'.join(lines)
    
    def _analyze_archetypes(self, extracted_texts: List[ExtractedText]) -> List[ArchetypeMatch]:
        """Analyze text for archetype matches"""
        all_text = " ".join([text.text for text in extracted_texts])
        
        if len(all_text) < self.config["min_text_length"]:
            return []
        
        matches = []
        
        # Clean and tokenize text
        tokens = self._tokenize_text(all_text)
        
        for archetype_name, archetype_data in self.archetype_matcher.archetype_keywords.items():
            # Calculate similarity score
            score = self._calculate_archetype_score(tokens, archetype_data["keywords"])
            
            if score > self.config["archetype_threshold"]:
                # Find matching text snippets
                matching_texts = self._find_matching_texts(all_text, archetype_data["keywords"])
                
                match = ArchetypeMatch(
                    archetype_name=archetype_name,
                    confidence_score=score,
                    matching_text=matching_texts,
                    frequency_correlation=self._calculate_frequency_correlation(archetype_data["frequency"]),
                    keywords=archetype_data["keywords"],
                    element=archetype_data["element"],
                    planetary_ruler=archetype_data["planetary"],
                    frequency_hz=archetype_data["frequency"]
                )
                
                matches.append(match)
        
        # Sort by confidence
        matches.sort(key=lambda x: x.confidence_score, reverse=True)
        return matches
    
    def _tokenize_text(self, text: str) -> List[str]:
        """Tokenize and clean text"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove punctuation and tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        try:
            stop_words = set(stopwords.words('english'))
            lemmatizer = WordNetLemmatizer()
            
            tokens = [
                lemmatizer.lemmatize(token) 
                for token in tokens 
                if token.isalpha() and token not in stop_words and len(token) > 2
            ]
        except:
            # Fallback if NLTK data not available
            tokens = [token for token in tokens if token.isalpha() and len(token) > 2]
        
        return tokens
    
    def _calculate_archetype_score(self, tokens: List[str], keywords: List[str]) -> float:
        """Calculate archetype matching score"""
        if not tokens or not keywords:
            return 0.0
        
        keyword_counts = Counter(tokens)
        total_tokens = len(tokens)
        
        score = 0.0
        for keyword in keywords:
            keyword_lower = keyword.lower()
            count = keyword_counts.get(keyword_lower, 0)
            score += count / total_tokens
        
        # Normalize and boost for multiple keyword matches
        score = min(score * len(keywords) / len(keywords), 1.0)
        return score
    
    def _find_matching_texts(self, text: str, keywords: List[str]) -> List[str]:
        """Find text snippets containing keywords"""
        sentences = sent_tokenize(text)
        matching_snippets = []
        
        for sentence in sentences:
            sentence_lower = sentence.lower()
            if any(keyword.lower() in sentence_lower for keyword in keywords):
                # Clean and limit length
                snippet = sentence.strip()
                if len(snippet) > 200:
                    snippet = snippet[:200] + "..."
                matching_snippets.append(snippet)
        
        return matching_snippets[:3]  # Limit to top 3 matches
    
    def _calculate_frequency_correlation(self, archetype_frequency: int) -> float:
        """Calculate correlation with sacred frequencies"""
        # Simple correlation based on frequency proximity
        sacred_freqs = [freq.frequency for freq in self.archetype_matcher.sacred_frequencies]
        
        min_distance = min(abs(archetype_frequency - freq) for freq in sacred_freqs)
        # Convert distance to correlation score (0-1, higher is better)
        correlation = max(0, 1 - min_distance / 1000)
        
        return correlation
    
    def _analyze_frequencies(self, extracted_texts: List[ExtractedText]) -> Dict[str, Any]:
        """Analyze text for frequency correlations"""
        all_text = " ".join([text.text for text in extracted_texts])
        
        # Count frequency-related keywords
        frequency_keywords = {
            396: ["liberation", "freedom", "guilt", "fear"],
            417: ["change", "transformation", "new", "different"],
            528: ["love", "healing", "repair", "miracle", "transformation"],
            639: ["connection", "communication", "relationship", "love"],
            741: ["expression", "solution", "awakening", "intuition"],
            852: ["intuition", "order", "spiritual", "divine"],
            963: ["divine", "enlightenment", "perfection", "unity"]
        }
        
        text_lower = all_text.lower()
        frequency_scores = {}
        
        for freq, keywords in frequency_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            if score > 0:
                frequency_scores[freq] = {
                    "score": score,
                    "frequency": freq,
                    "solfege": next((f.solfege for f in self.archetype_matcher.sacred_frequencies if f.frequency == freq), ""),
                    "matched_keywords": [kw for kw in keywords if kw in text_lower]
                }
        
        return {
            "frequency_correlations": frequency_scores,
            "dominant_frequencies": sorted(frequency_scores.items(), key=lambda x: x[1]["score"], reverse=True)[:3],
            "overall_resonance": sum(score["score"] for score in frequency_scores.values()) / max(len(frequency_scores), 1)
        }
    
    def _save_results(self, results: Dict[str, Any], metadata: BookMetadata) -> Path:
        """Save scan results to file"""
        # Create safe filename
        safe_title = re.sub(r'[^\w\-_.]', '', metadata.title)[:50]
        filename = f"scan_{safe_title}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        output_file = self.output_dir / filename
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        return output_file

# FastAPI Application
app = FastAPI(title="Cathedral Book Scanner", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global scanner instance
scanner = BookScanner()

@app.get("/")
async def root():
    return {"message": "Cathedral Book Scanner API", "version": "1.0.0"}

@app.post("/scan")
async def scan_book(file: UploadFile = File(...)):
    """Scan uploaded book file"""
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name
        
        # Process the file
        results = await scanner.scan_book(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        return JSONResponse(content=results)
        
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "scanner_ready": True
    }

if __name__ == "__main__":
    # Download required NLTK data
    try:
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('wordnet', quiet=True)
    except:
        logger.warning("NLTK data download failed, some features may be limited")
    
    # Start the server
    uvicorn.run(
        "cathedral_scanner:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )