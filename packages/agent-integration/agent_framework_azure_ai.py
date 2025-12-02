// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
"""
Azure AI Agent Client Stub
Azure integration disabled per user request - all operations are local-only
"""

class AzureAIAgentClient:
    """Azure AI stub (disabled - local operations only)"""
    
    def __init__(self, *args, **kwargs):
        print("ℹ️  Azure integration disabled per user request")
        print("   Using local-only agent functionality")
        self.local_mode = True
    
    def chat(self, message: str):
        """Local chat stub (Azure disabled)"""
        return {
            "response": "Local agent response (Azure disabled)",
            "mode": "local-only",
            "azure_enabled": False
        }
    
    def get_status(self):
        """Return agent status"""
        return {
            "status": "local-only",
            "azure_integration": "disabled",
            "message": "All operations are local per user configuration"
        }
