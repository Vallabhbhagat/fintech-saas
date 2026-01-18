# actions.py
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

# --- Budget & Saving ---
class ActionBudgetAdvice(Action):
    def name(self) -> Text:
        return "action_budget_advice"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "To create a monthly budget:\n"
            "1. Track your income and expenses.\n"
            "2. Categorize spending (needs, wants, savings).\n"
            "3. Set limits for each category.\n"
            "4. Review monthly. Use apps like Mint or Excel."
        ))
        return []

class ActionSavingAdvice(Action):
    def name(self) -> Text:
        return "action_saving_advice"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "A common rule is to save 20% of your income monthly. "
            "Adjust based on your goals and expenses."
        ))
        return []

# --- Debt Management ---
class ActionDebtManagement(Action):
    def name(self) -> Text:
        return "action_debt_management"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "To manage debt effectively:\n"
            "1. List all debts.\n"
            "2. Prioritize high-interest debt.\n"
            "3. Pay more than the minimum.\n"
            "4. Avoid adding new debt."
        ))
        return []

# --- Retirement Planning ---
class ActionRetirementAdvice(Action):
    def name(self) -> Text:
        return "action_retirement_advice"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "To plan for retirement:\n"
            "1. Start early.\n"
            "2. Invest in retirement accounts (401k, IRA, pension).\n"
            "3. Diversify portfolio.\n"
            "4. Adjust contributions over time."
        ))
        return []

# --- Banking Basics ---
class ActionBankingBasics(Action):
    def name(self) -> Text:
        return "action_banking_basics"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Banking basics:\n"
            "- Savings account: Deposit money, earn interest, withdraw anytime.\n"
            "- Checking account: For everyday transactions.\n"
            "- Choose banks based on fees, interest rates, and service."
        ))
        return []

# --- Credit Score ---
class ActionCreditScore(Action):
    def name(self) -> Text:
        return "action_credit_score"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Credit score represents creditworthiness.\n"
            "Tips to improve:\n"
            "- Pay bills on time.\n"
            "- Reduce debt.\n"
            "- Avoid maxing out cards.\n"
            "- Maintain a mix of credit types."
        ))
        return []

# --- Loans ---
class ActionLoanInfo(Action):
    def name(self) -> Text:
        return "action_loan_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Loans basics:\n"
            "- Personal loans: Borrow money, repay with interest.\n"
            "- Loan interest rate: Annual percentage charged by lender.\n"
            "- Apply for credit cards with proper income & ID."
        ))
        return []

# --- Investing Basics ---
class ActionInvestingBasics(Action):
    def name(self) -> Text:
        return "action_investing_basics"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Investing basics:\n"
            "- Stocks: Ownership in companies, potential dividends.\n"
            "- Bonds: Loans to companies/government, fixed interest.\n"
            "- Mutual Funds: Pool of money invested in stocks/bonds.\n"
            "- ETFs: Like mutual funds, traded on stock exchanges."
        ))
        return []

# --- Advanced Investing ---
class ActionAdvancedInvesting(Action):
    def name(self) -> Text:
        return "action_advanced_investing"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Advanced investing:\n"
            "- Diversify investments (stocks, bonds, real estate).\n"
            "- Risk vs Return: Higher potential returns = higher risk.\n"
            "- Asset allocation: Distribute investments by risk tolerance.\n"
            "- Dollar-cost averaging: Invest fixed amount regularly."
        ))
        return []

# --- Insurance ---
class ActionInsuranceInfo(Action):
    def name(self) -> Text:
        return "action_insurance_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Insurance basics:\n"
            "- Life insurance: Term vs Whole life.\n"
            "- Health insurance: Pay premium, insurer covers medical costs.\n"
            "- Calculate coverage: 10–15x annual income for life insurance."
        ))
        return []

# --- Crypto & Blockchain ---
class ActionCryptoFinance(Action):
    def name(self) -> Text:
        return "action_crypto_finance"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "Crypto basics:\n"
            "- Bitcoin, Ethereum: Decentralized digital currencies.\n"
            "- Invest safely via regulated exchanges, diversify holdings.\n"
            "- NFTs: Unique blockchain assets.\n"
            "- Blockchain: Decentralized ledger for secure transactions."
        ))
        return []

class ActionBlockchainAI(Action):
    def name(self) -> Text:
        return "action_blockchain_ai"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text=(
            "AI & Blockchain in Finance:\n"
            "- AI can track spending, detect fraud, forecast expenses.\n"
            "- Blockchain ensures secure, transparent transactions.\n"
            "- Used in crypto, smart contracts, cross-border payments."
        ))
        return []
# -------- Flask Bridge Function --------
def get_bot_reply(user_message: str) -> str:
    user_message = user_message.lower().strip()

    # Greetings
    if any(greeting in user_message for greeting in ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"]):
        return "Hello! 👋 I'm your financial assistant. I can help you with budgeting, saving, investing, debt management, and more. What would you like to know about?"

    # Budget
    elif "budget" in user_message:
        return (
            "To create a monthly budget:\n"
            "1. Track your income and expenses\n"
            "2. Categorize spending (needs, wants, savings)\n"
            "3. Set limits for each category\n"
            "4. Review monthly using Excel or apps"
        )

    # Saving
    elif "save" in user_message or "saving" in user_message:
        return "A common rule is to save at least 20% of your monthly income. Start small and increase gradually!"

    # Investing
    elif "invest" in user_message or "investment" in user_message or "stock" in user_message:
        return (
            "Investing basics:\n"
            "- Start with your goals and risk tolerance\n"
            "- Diversify your portfolio (stocks, bonds, funds)\n"
            "- Invest for the long term\n"
            "- Consider using index funds or ETFs for beginners"
        )

    # Debt
    elif "debt" in user_message or "loan" in user_message or "credit card" in user_message:
        return (
            "To manage debt effectively:\n"
            "1. List all debts with interest rates\n"
            "2. Pay more than the minimum payment\n"
            "3. Focus on high-interest debt first\n"
            "4. Consider debt consolidation if helpful"
        )

    # Retirement
    elif "retirement" in user_message or "retire" in user_message or "401k" in user_message or "ira" in user_message:
        return (
            "Retirement planning:\n"
            "1. Start saving early\n"
            "2. Contribute to 401(k), IRA, or pension plans\n"
            "3. Aim to replace 70-80% of pre-retirement income\n"
            "4. Diversify your retirement portfolio"
        )

    # SIP / Investments
    elif "sip" in user_message or "mutual fund" in user_message:
        return (
            "SIP (Systematic Investment Plan):\n"
            "- Invest fixed amount regularly (monthly/quarterly)\n"
            "- Benefits from rupee-cost averaging\n"
            "- Reduces timing risk\n"
            "- Great for long-term wealth building"
        )

    # Credit Score
    elif "credit score" in user_message or "credit rating" in user_message:
        return (
            "Improve your credit score:\n"
            "- Pay all bills on time\n"
            "- Keep credit card utilization below 30%\n"
            "- Don't close old credit accounts\n"
            "- Check for errors in your credit report"
        )

    # Help/Support
    elif "help" in user_message or "what can you do" in user_message or "capabilities" in user_message:
        return (
            "I can help you with:\n"
            "📊 Budgeting & expense tracking\n"
            "💰 Saving strategies\n"
            "📈 Investment basics\n"
            "💳 Debt management\n"
            "🏦 Banking & credit\n"
            "🎯 Retirement planning\n"
            "📉 SIP and mutual funds\n"
            "Ask me anything about personal finance!"
        )

    # Default response
    else:
        return (
            "I can help with financial topics! Try asking about:\n"
            "• Budget & saving\n"
            "• Investing & stocks\n"
            "• Debt management\n"
            "• Retirement planning\n"
            "• Credit score\n"
            "• SIP & mutual funds\n\n"
            "Or type 'help' for more options."
        )