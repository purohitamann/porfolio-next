'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Mail, MessageSquare, Star, Plus, Calendar, Heart, ExternalLink, Github, Linkedin, Instagram, BookOpen, Zap, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

// Fix import paths - adjust based on your actual file structure
import footerData from '../../../src/data/footer.json';
import blogData from '../../../src/data/blog.json';
import highlightsData from '../../../src/data/highlights.json';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'question' | 'response' | 'rating';
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  formData: FormData;
}

interface FormData {
  name: string;
  email: string;
  strengths: string;
  improvements: string;
  rating: number;
  contactPreference: string;
}

const AmanAsksPage = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'General Feedback',
      lastMessage: 'Welcome! Share your thoughts...',
      timestamp: new Date(),
      messages: [],
      formData: {
        name: '',
        email: '',
        strengths: '',
        improvements: '',
        rating: 0,
        contactPreference: ''
      }
    }
  ]);
  const [activeChat, setActiveChat] = useState('1');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    strengths: '',
    improvements: '',
    rating: 0,
    contactPreference: ''
  });
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check screen size on mount
  useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
      setRightSidebarOpen(window.innerWidth >= 1280);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const botQuestions = [
    {
      text: "Hi there! I'm here to collect feedback about Aman's work. What's your name?",
      field: 'name' as keyof FormData
    },
    {
      text: "Nice to meet you, {name}! What's your email address so Aman can get back to you?",
      field: 'email' as keyof FormData
    },
    {
      text: "What do you think Aman does really well? What are his strengths that stand out to you?",
      field: 'strengths' as keyof FormData
    },
    {
      text: "What areas do you think Aman could improve on? Any suggestions or feedback for growth?",
      field: 'improvements' as keyof FormData
    },
    {
      text: "How would you rate your overall experience with Aman's portfolio? (1-5 stars)",
      field: 'rating' as keyof FormData,
      type: 'rating' as const
    },
    {
      text: "How would you prefer Aman to contact you back?",
      field: 'contactPreference' as keyof FormData,
      type: 'options' as const,
      options: ['Email', 'LinkedIn', 'Phone Call', 'No contact needed']
    }
  ];

  useEffect(() => {
    // Start conversation for active chat
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat) {
      setMessages(currentChat.messages);
      setFormData(currentChat.formData);
      
      // Calculate current step based on user responses
      const userResponses = currentChat.messages.filter(msg => !msg.isBot).length;
      setCurrentStep(userResponses);
      
      // Only start conversation if no messages exist
      if (currentChat.messages.length === 0) {
        setTimeout(() => {
          addBotMessage(botQuestions[0].text);
        }, 1000);
      }
    }
  }, [activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit feedback to Firebase
  const submitFeedback = async (finalFormData: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const feedbackData = {
        ...finalFormData,
        submittedAt: serverTimestamp(),
        chatId: activeChat,
        conversation: messages.map(msg => ({
          text: msg.text,
          isBot: msg.isBot,
          timestamp: msg.timestamp
        }))
      };

      await addDoc(collection(db, 'aman-asks'), feedbackData);
      
      setTimeout(() => {
        addBotMessage(
          "Perfect! Your feedback has been saved successfully. Aman will review your message and get back to you soon. Thank you for taking the time to share your thoughts! 🚀"
        );
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Failed to submit feedback. Please try again.');
      
      setTimeout(() => {
        addBotMessage(
          "Sorry, there was an issue saving your feedback. Please try again or contact Aman directly via email."
        );
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const processedText = text.replace('{name}', formData.name);
      const newMessage = {
        id: Date.now(),
        text: processedText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => {
        const updated = [...prev, newMessage];
        updateChatMessages(activeChat, updated);
        return updated;
      });
      setIsTyping(false);
    }, 1500);
  };

  const addUserMessage = (text: string) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => {
      const updated = [...prev, newMessage];
      updateChatMessages(activeChat, updated);
      return updated;
    });
  };

  const updateChatMessages = (chatId: string, newMessages: Message[]) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: newMessages,
            lastMessage: newMessages[newMessages.length - 1]?.text || 'New conversation',
            timestamp: new Date(),
            formData: formData
          }
        : chat
    ));
  };

  // Update chat's form data whenever formData changes
  const updateChatFormData = (chatId: string, newFormData: FormData) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            formData: newFormData
          }
        : chat
    ));
  };

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: `Chat ${chats.length + 1}`,
      lastMessage: 'New conversation started',
      timestamp: new Date(),
      messages: [],
      formData: {
        name: '',
        email: '',
        strengths: '',
        improvements: '',
        rating: 0,
        contactPreference: ''
      }
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChatId);
    setMessages([]);
    setCurrentStep(0);
    setFormData({
      name: '',
      email: '',
      strengths: '',
      improvements: '',
      rating: 0,
      contactPreference: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const currentQuestion = botQuestions[currentStep];
    addUserMessage(currentInput);

    // Update form data
    const updatedFormData = {
      ...formData,
      [currentQuestion.field]: currentInput
    };
    setFormData(updatedFormData);
    updateChatFormData(activeChat, updatedFormData);

    setCurrentInput('');

    // Move to next step
    setTimeout(() => {
      if (currentStep < botQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
        addBotMessage(botQuestions[currentStep + 1].text);
      } else {
        // Final step - submit to Firebase
        submitFeedback(updatedFormData);
      }
    }, 500);
  };

  const handleRatingClick = (rating: number) => {
    const ratingText = `${rating} star${rating !== 1 ? 's' : ''}`;
    addUserMessage(ratingText);
    
    const updatedFormData = {
      ...formData,
      rating
    };
    setFormData(updatedFormData);
    updateChatFormData(activeChat, updatedFormData);

    setTimeout(() => {
      if (currentStep < botQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
        addBotMessage(botQuestions[currentStep + 1].text);
      } else {
        // Final step - submit to Firebase
        submitFeedback(updatedFormData);
      }
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    const updatedFormData = {
      ...formData,
      contactPreference: option
    };
    setFormData(updatedFormData);
    updateChatFormData(activeChat, updatedFormData);

    setTimeout(() => {
      // Final step - submit to Firebase
      submitFeedback(updatedFormData);
    }, 500);
  };

  const currentQuestion = botQuestions[currentStep];
  const isCompleted = currentStep >= botQuestions.length;

  // Safe data access with fallbacks - use hardcoded data if imports fail
  const recentBlogs = blogData?.posts?.slice(0, 3) || [
    { id: 1, title: 'Sample Blog Post', slug: 'sample', readTime: '5 min read' },
    { id: 2, title: 'Another Blog Post', slug: 'another', readTime: '3 min read' },
  ];
  
  const recentHighlights = highlightsData?.highlights?.slice(0, 3) || [
    { id: 1, title: 'Sample Highlight', description: 'Sample description', date: '2024', link: '#' },
  ];

  // Fallback footer data
  const footerLinks = footerData || {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    medium: 'https://medium.com',
    instagram: 'https://instagram.com',
    email: 'hello@example.com'
  };

  return (
    <div className="h-screen flex pt-16 bg-background relative">
      {/* Mobile Overlay */}
      {(sidebarOpen || rightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden xl:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-card border-r border-border flex flex-col overflow-hidden lg:relative absolute left-0 top-16 h-[calc(100vh-4rem)] z-20 lg:z-auto lg:h-auto lg:top-0`}>
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <button
              onClick={createNewChat}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={createNewChat}
            className="w-full p-2 sm:p-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Start New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full p-3 sm:p-4 text-left hover:bg-muted transition-colors border-b border-border/50 ${
                activeChat === chat.id ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-foreground truncate">
                    {chat.formData.name ? `${chat.formData.name}'s Feedback` : chat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Branded Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b border-border p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Aman Asks</h1>
              <p className="text-base sm:text-lg text-muted-foreground px-4">Your feedback matters • Let&apos;s connect and grow together</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center justify-center">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <p className="text-sm sm:text-base text-foreground font-medium">
                  This is not a chatbot! This will help Aman get feedback and possibly book a chat with you in the future.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=amanhiranpurohit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 text-center outline-none no-underline text-white w-full sm:w-48 h-10 sm:h-8 rounded-full bg-[#0A66C2] font-sans text-sm mt-2 sm:mt-0"
              >
                Follow on LinkedIn 
              </a>
            </div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="bg-card border-b border-border p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Feedback Assistant</h3>
              <p className="text-sm text-muted-foreground">Collecting thoughts for Aman</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors xl:hidden"
              title="Toggle Links"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 mb-6 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[280px] sm:max-w-xs md:max-w-md p-3 sm:p-4 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-muted text-foreground rounded-bl-sm'
                      : 'bg-primary text-primary-foreground rounded-br-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {(isTyping || isSubmitting) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mb-6"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex gap-1 items-center">
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 animate-spin" />
                      <span className="text-sm text-muted-foreground ml-2">Saving your feedback...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {!isCompleted && !isTyping && !isSubmitting && (
          <div className="p-3 sm:p-4 border-t border-border bg-card">
            {currentQuestion?.type === 'rating' ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground text-center">Rate your experience:</p>
                <div className="flex gap-1 sm:gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="text-xl sm:text-2xl hover:scale-110 transition-transform p-2 sm:p-2"
                    >
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 fill-current text-yellow-400 hover:text-yellow-300" />
                    </button>
                  ))}
                </div>
              </div>
            ) : currentQuestion?.type === 'options' ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground text-center mb-2">Choose an option:</p>
                <div className="grid grid-cols-1 gap-2">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="p-3 text-left text-sm sm:text-base rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
                <input
                  type={currentQuestion?.field === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={!currentInput.trim()}
                  className="p-2 sm:p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </form>
            )}
            
            {/* Error Message */}
            {submitError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* Completion Message */}
        {isCompleted && (
          <div className="p-4 sm:p-6 border-t border-border bg-card text-center">
            <div className="text-green-600 mb-3">
              <MessageSquare className="h-10 w-10 mx-auto" />
            </div>
            <p className="text-foreground font-medium mb-2">Thank you for your feedback!</p>
            <p className="text-sm text-muted-foreground">
              Aman will review your message and get back to you soon.
            </p>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className={`${rightSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-card border-l border-border flex flex-col overflow-hidden xl:relative absolute right-0 top-16 h-[calc(100vh-4rem)] z-20 xl:z-auto xl:h-auto xl:top-0`}>
        {/* Social Links Section */}
        <div className="p-3 sm:p-4 border-b border-border">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Connect with Aman</h3>
          <div className="space-y-3">
            <a 
              href={footerData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-xs sm:text-sm font-medium">GitHub</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={footerData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium">LinkedIn</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={footerData.medium} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium">Medium</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={footerData.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium">Instagram</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={`mailto:${footerData.email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium">Email</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Blogs</h3>
            <Link href="/blog" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentBlogs.map((blog) => (
              <Link 
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block p-2 sm:p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <h4 className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{blog.readTime}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-muted-foreground">Read more</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Highlights */}
        <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Highlights</h3>
            <Link href="/blog" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentHighlights.map((highlight) => (
              <div key={highlight.id} className="p-2 sm:p-3 rounded-lg border border-border/50">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <h4 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">
                    {highlight.title}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
                  {highlight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{highlight.date}</span>
                  {highlight.link && (
                    <a 
                      href={highlight.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmanAsksPage;