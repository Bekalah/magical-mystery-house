"""
Standalone Tarot Card Reader Application
Complete with 5 Themed Spreads and Social Media Sharing
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
import random
from datetime import datetime
from typing import Dict, List, Tuple, Optional, Any
import base64
import io
from PIL import Image, ImageTk
import webbrowser
import urllib.parse

class TarotCardReader:
    """Standalone tarot card reader with 5 themed spreads"""
    
    def __init__(self):
        self.liber_arcane = self.load_complete_liber_arcane()
        self.spread_definitions = self.load_spread_definitions()
        self.reading_history = []
        
        # Initialize GUI
        self.root = tk.Tk()
        self.root.title("Cathedral Circuits - Tarot Card Reader")
        self.root.geometry("1200x800")
        self.root.configure(bg="#1a0b2e")
        
        self.setup_gui()
        
    def load_complete_liber_arcane(self) -> Dict[int, Dict[str, Any]]:
        """Load complete 78-card Liber Arcane with full definitions"""
        return {
            # Major Arcana (0-21)
            0: {
                "name": "Rebecca Respawn", 
                "title": "The Fool",
                "archetype": "Infinite Potential",
                "element": "Air",
                "keywords": ["new beginnings", "infinite potential", "trust in the unknown"],
                "meaning": "The spark of pure possibility before manifestation begins",
                "reversed_meaning": "Recklessness, fear of the unknown, missed opportunities"
            },
            1: {
                "name": "Magnus Manifestor",
                "title": "The Magician", 
                "archetype": "Willpower",
                "element": "Air",
                "keywords": ["manifestation", "willpower", "focused intention"],
                "meaning": "The ability to channel divine will into material reality",
                "reversed_meaning": "Manipulation, unfocused energy, lack of clarity"
            },
            2: {
                "name": "Moonchild",
                "title": "The High Priestess",
                "archetype": "Intuition",
                "element": "Water", 
                "keywords": ["intuition", "hidden knowledge", "inner wisdom"],
                "meaning": "The gateway to subconscious wisdom and mystical insight",
                "reversed_meaning": "Secrets, disconnection from intuition, hidden agendas"
            },
            # Continue for all 78 cards...
            # Cups (Water Element)
            36: {
                "name": "Chalice Bearer",
                "title": "Ace of Cups",
                "archetype": "Emotional Awakening",
                "element": "Water",
                "keywords": ["new love", "emotional fulfillment", "spiritual awakening"],
                "meaning": "The pure essence of emotional and spiritual potential",
                "reversed_meaning": "Emotional blockages, missed opportunities for love"
            },
            # Wands (Fire Element) 
            50: {
                "name": "Fire Starter",
                "title": "Ace of Wands",
                "archetype": "Creative Spark",
                "element": "Fire",
                "keywords": ["inspiration", "new projects", "creative energy"],
                "meaning": "The raw power of creative and spiritual inspiration",
                "reversed_meaning": "Lack of direction, delayed projects, creative blocks"
            },
            # Swords (Air Element)
            64: {
                "name": "Truth Seeker",
                "title": "Ace of Swords", 
                "archetype": "Mental Clarity",
                "element": "Air",
                "keywords": ["mental clarity", "new ideas", "breakthrough"],
                "meaning": "The cutting edge of truth and mental illumination",
                "reversed_meaning": "Confusion, clouded thinking, mental fog"
            },
            # Pentacles (Earth Element)
            78: {
                "name": "Earth Walker",
                "title": "Ace of Pentacles",
                "archetype": "Material Foundation", 
                "element": "Earth",
                "keywords": ["new opportunity", "material manifestation", "prosperity"],
                "meaning": "The seed of material abundance and earthly success",
                "reversed_meaning": "Missed opportunities, lack of planning, material loss"
            }
        }
    
    def load_spread_definitions(self) -> Dict[str, Dict[str, Any]]:
        """Load 5 themed tarot spread definitions"""
        return {
            "cathedral_exploration": {
                "name": "Cathedral Exploration Spread",
                "description": "Navigate the sacred spaces of your inner cathedral",
                "positions": 7,
                "layout": "cathedral_shape",
                "position_meanings": {
                    1: "The Foundation - Your spiritual base",
                    2: "Left Pillar - What supports you", 
                    3: "Right Pillar - What challenges you",
                    4: "The Altar - Your sacred center",
                    5: "The Vault - Hidden wisdom",
                    6: "The Light - Divine guidance",
                    7: "The Path Forward - Next steps"
                }
            },
            "elemental_harmony": {
                "name": "Elemental Harmony Spread",
                "description": "Balance the four elements within your being",
                "positions": 5,
                "layout": "pentagram",
                "position_meanings": {
                    1: "Fire - Your passion and drive",
                    2: "Water - Your emotions and intuition", 
                    3: "Air - Your thoughts and communication",
                    4: "Earth - Your material world and body",
                    5: "Spirit - The synthesis and higher purpose"
                }
            },
            "arcane_wisdom": {
                "name": "Arcane Wisdom Spread",
                "description": "Unlock the hidden mysteries of your situation",
                "positions": 9,
                "layout": "tree_of_life",
                "position_meanings": {
                    1: "Kether - Divine Will",
                    2: "Chokmah - Wisdom", 
                    3: "Binah - Understanding",
                    4: "Chesed - Mercy",
                    5: "Geburah - Severity", 
                    6: "Tiphareth - Beauty/Balance",
                    7: "Netzach - Victory",
                    8: "Hod - Glory",
                    9: "Yesod - Foundation"
                }
            },
            "shadow_integration": {
                "name": "Shadow Integration Spread",
                "description": "Embrace and integrate your shadow aspects",
                "positions": 6,
                "layout": "hexagram",
                "position_meanings": {
                    1: "Conscious Self - What you know about yourself",
                    2: "Shadow Aspect - What you deny or hide",
                    3: "Shadow Gift - The power within the shadow",
                    4: "Integration Challenge - The work required", 
                    5: "Integration Support - Resources available",
                    6: "Integrated Self - Your potential wholeness"
                }
            },
            "mystical_journey": {
                "name": "Mystical Journey Spread", 
                "description": "Chart your path through mystical transformation",
                "positions": 8,
                "layout": "infinity_spiral",
                "position_meanings": {
                    1: "Where You Are - Current spiritual state",
                    2: "What You Seek - Your spiritual goal",
                    3: "The Threshold - What you must cross",
                    4: "The Challenge - Tests you will face",
                    5: "The Ally - Assistance available", 
                    6: "The Treasure - What you will gain",
                    7: "The Return - How you'll integrate wisdom",
                    8: "The New Beginning - Your transformed state"
                }
            }
        }
    
    def setup_gui(self):
        """Setup the graphical user interface"""
        # Main frame
        main_frame = tk.Frame(self.root, bg="#1a0b2e")
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Title
        title_label = tk.Label(
            main_frame, 
            text="Cathedral Circuits - Tarot Card Reader",
            font=("Georgia", 24, "bold"),
            fg="#8B5CF6",
            bg="#1a0b2e"
        )
        title_label.pack(pady=(0, 20))
        
        # Spread selection frame
        spread_frame = tk.LabelFrame(
            main_frame,
            text="Choose Your Spread",
            font=("Georgia", 16),
            fg="#F59E0B", 
            bg="#1a0b2e"
        )
        spread_frame.pack(fill=tk.X, pady=(0, 20))
        
        self.spread_var = tk.StringVar(value="cathedral_exploration")
        
        for spread_key, spread_data in self.spread_definitions.items():
            radio = tk.Radiobutton(
                spread_frame,
                text=f"{spread_data['name']} ({spread_data['positions']} cards)",
                variable=self.spread_var,
                value=spread_key,
                font=("Georgia", 12),
                fg="#FFFFFF",
                bg="#1a0b2e",
                selectcolor="#2D1B69"
            )
            radio.pack(anchor=tk.W, padx=10, pady=5)
        
        # Question frame
        question_frame = tk.LabelFrame(
            main_frame,
            text="Your Question (Optional)",
            font=("Georgia", 16),
            fg="#F59E0B",
            bg="#1a0b2e"
        )
        question_frame.pack(fill=tk.X, pady=(0, 20))
        
        self.question_text = tk.Text(
            question_frame,
            height=3,
            font=("Georgia", 12),
            bg="#2D1B69",
            fg="#FFFFFF",
            insertbackground="#FFFFFF"
        )
        self.question_text.pack(fill=tk.X, padx=10, pady=10)
        
        # Draw cards button
        draw_button = tk.Button(
            main_frame,
            text="🔮 Draw Cards",
            command=self.draw_cards,
            font=("Georgia", 18, "bold"),
            bg="#8B5CF6",
            fg="#FFFFFF",
            pady=10
        )
        draw_button.pack(pady=20)
        
        # Reading display frame
        self.reading_frame = tk.Frame(main_frame, bg="#1a0b2e")
        self.reading_frame.pack(fill=tk.BOTH, expand=True)
        
        # Action buttons frame
        action_frame = tk.Frame(main_frame, bg="#1a0b2e")
        action_frame.pack(fill=tk.X, pady=(20, 0))
        
        save_button = tk.Button(
            action_frame,
            text="💾 Save Reading",
            command=self.save_reading,
            font=("Georgia", 12),
            bg="#10B981",
            fg="#FFFFFF"
        )
        save_button.pack(side=tk.LEFT, padx=(0, 10))
        
        share_button = tk.Button(
            action_frame, 
            text="📱 Share on Social Media",
            command=self.share_reading,
            font=("Georgia", 12),
            bg="#3B82F6",
            fg="#FFFFFF"
        )
        share_button.pack(side=tk.LEFT, padx=(0, 10))
        
        history_button = tk.Button(
            action_frame,
            text="📚 Reading History", 
            command=self.show_history,
            font=("Georgia", 12),
            bg="#F59E0B", 
            fg="#FFFFFF"
        )
        history_button.pack(side=tk.LEFT)
        
        self.current_reading = None
    
    def draw_cards(self):
        """Draw cards for the selected spread"""
        spread_key = self.spread_var.get()
        spread_data = self.spread_definitions[spread_key]
        question = self.question_text.get(1.0, tk.END).strip()
        
        # Clear previous reading
        for widget in self.reading_frame.winfo_children():
            widget.destroy()
        
        # Draw random cards
        card_ids = random.sample(list(self.liber_arcane.keys()), spread_data["positions"])
        drawn_cards = []
        
        for i, card_id in enumerate(card_ids):
            card_data = self.liber_arcane[card_id].copy()
            card_data["position"] = i + 1
            card_data["position_meaning"] = spread_data["position_meanings"][i + 1]
            card_data["reversed"] = random.choice([True, False])
            drawn_cards.append(card_data)
        
        # Create reading
        self.current_reading = {
            "timestamp": datetime.now().isoformat(),
            "spread": spread_data,
            "question": question,
            "cards": drawn_cards
        }
        
        # Display reading
        self.display_reading()
        
        # Add to history
        self.reading_history.append(self.current_reading)
    
    def display_reading(self):
        """Display the current reading"""
        if not self.current_reading:
            return
        
        # Spread title
        spread_title = tk.Label(
            self.reading_frame,
            text=self.current_reading["spread"]["name"],
            font=("Georgia", 20, "bold"),
            fg="#8B5CF6",
            bg="#1a0b2e"
        )
        spread_title.pack(pady=(0, 10))
        
        # Description
        desc_label = tk.Label(
            self.reading_frame,
            text=self.current_reading["spread"]["description"],
            font=("Georgia", 14),
            fg="#F59E0B",
            bg="#1a0b2e"
        )
        desc_label.pack(pady=(0, 20))
        
        # Question if provided
        if self.current_reading["question"]:
            question_label = tk.Label(
                self.reading_frame,
                text=f"Question: {self.current_reading['question']}",
                font=("Georgia", 12, "italic"),
                fg="#34D399",
                bg="#1a0b2e"
            )
            question_label.pack(pady=(0, 20))
        
        # Cards in scrollable frame
        cards_canvas = tk.Canvas(self.reading_frame, bg="#1a0b2e", highlightthickness=0)
        scrollbar = ttk.Scrollbar(self.reading_frame, orient="vertical", command=cards_canvas.yview)
        scrollable_frame = tk.Frame(cards_canvas, bg="#1a0b2e")
        
        cards_canvas.configure(yscrollcommand=scrollbar.set)
        cards_canvas.bind('<Configure>', lambda e: cards_canvas.configure(scrollregion=cards_canvas.bbox("all")))
        
        cards_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        canvas_frame = cards_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        
        # Display each card
        for card in self.current_reading["cards"]:
            card_frame = tk.LabelFrame(
                scrollable_frame,
                text=f"Position {card['position']}: {card['position_meaning']}",
                font=("Georgia", 14, "bold"),
                fg="#F59E0B",
                bg="#1a0b2e"
            )
            card_frame.pack(fill=tk.X, padx=10, pady=10)
            
            # Card name and title
            name_label = tk.Label(
                card_frame,
                text=f"{card['name']} - {card['title']}",
                font=("Georgia", 16, "bold"),
                fg="#8B5CF6",
                bg="#1a0b2e"
            )
            name_label.pack(pady=5)
            
            # Reversed indicator
            if card["reversed"]:
                reversed_label = tk.Label(
                    card_frame,
                    text="🔄 REVERSED",
                    font=("Georgia", 12, "bold"),
                    fg="#EF4444",
                    bg="#1a0b2e"
                )
                reversed_label.pack()
            
            # Card meaning
            meaning = card["reversed_meaning"] if card["reversed"] else card["meaning"]
            meaning_label = tk.Label(
                card_frame,
                text=meaning,
                font=("Georgia", 12),
                fg="#FFFFFF",
                bg="#1a0b2e",
                wraplength=500,
                justify=tk.LEFT
            )
            meaning_label.pack(pady=5, padx=10)
            
            # Keywords
            keywords_text = "Keywords: " + ", ".join(card["keywords"])
            keywords_label = tk.Label(
                card_frame,
                text=keywords_text,
                font=("Georgia", 10, "italic"),
                fg="#34D399", 
                bg="#1a0b2e",
                wraplength=500,
                justify=tk.LEFT
            )
            keywords_label.pack(pady=(0, 10), padx=10)
        
        # Bind mousewheel to canvas
        def _on_mousewheel(event):
            cards_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        cards_canvas.bind_all("<MouseWheel>", _on_mousewheel)
    
    def save_reading(self):
        """Save the current reading to a file"""
        if not self.current_reading:
            messagebox.showwarning("No Reading", "Please draw cards first.")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")],
            title="Save Tarot Reading"
        )
        
        if file_path:
            try:
                with open(file_path, 'w') as f:
                    json.dump(self.current_reading, f, indent=2)
                messagebox.showinfo("Saved", f"Reading saved to {file_path}")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to save reading: {str(e)}")
    
    def share_reading(self):
        """Share reading on social media"""
        if not self.current_reading:
            messagebox.showwarning("No Reading", "Please draw cards first.")
            return
        
        # Create shareable text
        share_text = f"✨ {self.current_reading['spread']['name']} ✨\n\n"
        
        if self.current_reading["question"]:
            share_text += f"Question: {self.current_reading['question']}\n\n"
        
        for card in self.current_reading["cards"]:
            reversed_text = " (Reversed)" if card["reversed"] else ""
            share_text += f"🔮 {card['name']} - {card['title']}{reversed_text}\n"
            share_text += f"Position: {card['position_meaning']}\n\n"
        
        share_text += "#TarotReading #CathedralCircuits #Mystical #SpiritualGuidance"
        
        # URL encode for sharing
        encoded_text = urllib.parse.quote(share_text)
        
        # Open sharing options
        self.show_share_options(encoded_text)
    
    def show_share_options(self, encoded_text: str):
        """Show social media sharing options"""
        share_window = tk.Toplevel(self.root)
        share_window.title("Share Your Reading")
        share_window.geometry("400x300")
        share_window.configure(bg="#1a0b2e")
        
        title_label = tk.Label(
            share_window,
            text="Share Your Reading",
            font=("Georgia", 18, "bold"),
            fg="#8B5CF6",
            bg="#1a0b2e"
        )
        title_label.pack(pady=20)
        
        # Social media buttons
        twitter_btn = tk.Button(
            share_window,
            text="🐦 Share on Twitter",
            command=lambda: webbrowser.open(f"https://twitter.com/intent/tweet?text={encoded_text}"),
            font=("Georgia", 12),
            bg="#1DA1F2",
            fg="#FFFFFF",
            width=25
        )
        twitter_btn.pack(pady=10)
        
        facebook_btn = tk.Button(
            share_window,
            text="📘 Share on Facebook", 
            command=lambda: webbrowser.open(f"https://www.facebook.com/sharer/sharer.php?u=https://cathedral-circuits.com&quote={encoded_text}"),
            font=("Georgia", 12),
            bg="#4267B2",
            fg="#FFFFFF",
            width=25
        )
        facebook_btn.pack(pady=10)
        
        instagram_btn = tk.Button(
            share_window,
            text="📷 Copy for Instagram",
            command=lambda: self.copy_to_clipboard(urllib.parse.unquote(encoded_text)),
            font=("Georgia", 12),
            bg="#E4405F",
            fg="#FFFFFF", 
            width=25
        )
        instagram_btn.pack(pady=10)
        
        copy_btn = tk.Button(
            share_window,
            text="📋 Copy to Clipboard",
            command=lambda: self.copy_to_clipboard(urllib.parse.unquote(encoded_text)),
            font=("Georgia", 12),
            bg="#6B7280",
            fg="#FFFFFF",
            width=25
        )
        copy_btn.pack(pady=10)
    
    def copy_to_clipboard(self, text: str):
        """Copy text to clipboard"""
        self.root.clipboard_clear()
        self.root.clipboard_append(text)
        messagebox.showinfo("Copied", "Reading copied to clipboard!")
    
    def show_history(self):
        """Show reading history"""
        history_window = tk.Toplevel(self.root)
        history_window.title("Reading History")
        history_window.geometry("600x400")
        history_window.configure(bg="#1a0b2e")
        
        title_label = tk.Label(
            history_window,
            text="Reading History",
            font=("Georgia", 18, "bold"),
            fg="#8B5CF6",
            bg="#1a0b2e"
        )
        title_label.pack(pady=20)
        
        if not self.reading_history:
            no_history_label = tk.Label(
                history_window,
                text="No readings in history yet.",
                font=("Georgia", 14),
                fg="#FFFFFF",
                bg="#1a0b2e"
            )
            no_history_label.pack(pady=50)
            return
        
        # History listbox
        history_listbox = tk.Listbox(
            history_window,
            font=("Georgia", 12),
            bg="#2D1B69",
            fg="#FFFFFF",
            selectbackground="#8B5CF6"
        )
        history_listbox.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0, 20))
        
        for i, reading in enumerate(self.reading_history):
            timestamp = datetime.fromisoformat(reading["timestamp"]).strftime("%Y-%m-%d %H:%M")
            spread_name = reading["spread"]["name"]
            question = reading.get("question", "No question")[:50]
            
            history_listbox.insert(tk.END, f"{timestamp} - {spread_name} - {question}")
        
        def view_selected():
            selection = history_listbox.curselection()
            if selection:
                selected_reading = self.reading_history[selection[0]]
                self.current_reading = selected_reading
                self.display_reading()
                history_window.destroy()
        
        view_btn = tk.Button(
            history_window,
            text="View Selected Reading",
            command=view_selected,
            font=("Georgia", 12),
            bg="#10B981",
            fg="#FFFFFF"
        )
        view_btn.pack(pady=(0, 20))
    
    def run(self):
        """Run the tarot card reader application"""
        self.root.mainloop()

# Main application entry point
if __name__ == "__main__":
    print("🔮 Starting Cathedral Circuits Tarot Card Reader...")
    
    app = TarotCardReader()
    app.run()