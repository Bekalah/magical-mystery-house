// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
"""
Local agent framework stub
Azure dependencies removed per user request
"""

class ChatAgent:
    """Lightweight local chat agent (Azure removed)"""
    
    def __init__(self, *args, **kwargs):
        self.messages = []
        self.config = kwargs
    
    def add_message(self, role: str, content: str):
        """Add a message to the conversation"""
        self.messages.append({"role": role, "content": content})
    
    def get_response(self, prompt: str = None):
        """Get agent response (stub implementation)"""
        return {
            "response": "Local agent response (implement custom logic here)",
            "status": "success"
        }
    
    def reset(self):
        """Reset conversation"""
        self.messages = []
