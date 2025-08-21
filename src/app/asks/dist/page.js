'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../../lib/firebase");
// Fix import paths
var footer_json_1 = require("../../data/footer.json");
var blog_json_1 = require("../../data/blog.json");
var highlights_json_1 = require("../../data/highlights.json");
var AmanAsksPage = function () {
    var _a, _b, _c;
    var _d = react_1.useState([
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
    ]), chats = _d[0], setChats = _d[1];
    var _e = react_1.useState('1'), activeChat = _e[0], setActiveChat = _e[1];
    var _f = react_1.useState([]), messages = _f[0], setMessages = _f[1];
    var _g = react_1.useState(''), currentInput = _g[0], setCurrentInput = _g[1];
    var _h = react_1.useState(0), currentStep = _h[0], setCurrentStep = _h[1];
    var _j = react_1.useState({
        name: '',
        email: '',
        strengths: '',
        improvements: '',
        rating: 0,
        contactPreference: ''
    }), formData = _j[0], setFormData = _j[1];
    var _k = react_1.useState(false), rightSidebarOpen = _k[0], setRightSidebarOpen = _k[1];
    var _l = react_1.useState(false), isTyping = _l[0], setIsTyping = _l[1];
    var _m = react_1.useState(false), sidebarOpen = _m[0], setSidebarOpen = _m[1];
    var _o = react_1.useState(false), isSubmitting = _o[0], setIsSubmitting = _o[1];
    var _p = react_1.useState(null), submitError = _p[0], setSubmitError = _p[1];
    var messagesEndRef = react_1.useRef(null);
    // Check screen size on mount
    react_1.useEffect(function () {
        var checkScreenSize = function () {
            setSidebarOpen(window.innerWidth >= 1024);
            setRightSidebarOpen(window.innerWidth >= 1280);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return function () { return window.removeEventListener('resize', checkScreenSize); };
    }, []);
    var botQuestions = [
        {
            text: "Hi there! I'm here to collect feedback about Aman's work. What's your name?",
            field: 'name'
        },
        {
            text: "Nice to meet you, {name}! What's your email address so Aman can get back to you?",
            field: 'email'
        },
        {
            text: "What do you think Aman does really well? What are his strengths that stand out to you?",
            field: 'strengths'
        },
        {
            text: "What areas do you think Aman could improve on? Any suggestions or feedback for growth?",
            field: 'improvements'
        },
        {
            text: "How would you rate your overall experience with Aman's portfolio? (1-5 stars)",
            field: 'rating',
            type: 'rating'
        },
        {
            text: "How would you prefer Aman to contact you back?",
            field: 'contactPreference',
            type: 'options',
            options: ['Email', 'LinkedIn', 'Phone Call', 'No contact needed']
        }
    ];
    react_1.useEffect(function () {
        // Start conversation for active chat
        var currentChat = chats.find(function (chat) { return chat.id === activeChat; });
        if (currentChat) {
            setMessages(currentChat.messages);
            setFormData(currentChat.formData);
            // Calculate current step based on user responses
            var userResponses = currentChat.messages.filter(function (msg) { return !msg.isBot; }).length;
            setCurrentStep(userResponses);
            // Only start conversation if no messages exist
            if (currentChat.messages.length === 0) {
                setTimeout(function () {
                    addBotMessage(botQuestions[0].text);
                }, 1000);
            }
        }
    }, [activeChat]);
    react_1.useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    // Submit feedback to Firebase
    var submitFeedback = function (finalFormData) { return __awaiter(void 0, void 0, void 0, function () {
        var feedbackData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    setSubmitError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    feedbackData = __assign(__assign({}, finalFormData), { submittedAt: firestore_1.serverTimestamp(), chatId: activeChat, conversation: messages.map(function (msg) { return ({
                            text: msg.text,
                            isBot: msg.isBot,
                            timestamp: msg.timestamp
                        }); }) });
                    return [4 /*yield*/, firestore_1.addDoc(firestore_1.collection(firebase_1.db, 'aman-asks'), feedbackData)];
                case 2:
                    _a.sent();
                    setTimeout(function () {
                        addBotMessage("Perfect! Your feedback has been saved successfully. Aman will review your message and get back to you soon. Thank you for taking the time to share your thoughts! 🚀");
                    }, 1000);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error submitting feedback:', error_1);
                    setSubmitError('Failed to submit feedback. Please try again.');
                    setTimeout(function () {
                        addBotMessage("Sorry, there was an issue saving your feedback. Please try again or contact Aman directly via email.");
                    }, 1000);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var addBotMessage = function (text) {
        setIsTyping(true);
        setTimeout(function () {
            var processedText = text.replace('{name}', formData.name);
            var newMessage = {
                id: Date.now(),
                text: processedText,
                isBot: true,
                timestamp: new Date()
            };
            setMessages(function (prev) {
                var updated = __spreadArrays(prev, [newMessage]);
                updateChatMessages(activeChat, updated);
                return updated;
            });
            setIsTyping(false);
        }, 1500);
    };
    var addUserMessage = function (text) {
        var newMessage = {
            id: Date.now(),
            text: text,
            isBot: false,
            timestamp: new Date()
        };
        setMessages(function (prev) {
            var updated = __spreadArrays(prev, [newMessage]);
            updateChatMessages(activeChat, updated);
            return updated;
        });
    };
    var updateChatMessages = function (chatId, newMessages) {
        setChats(function (prev) { return prev.map(function (chat) {
            var _a;
            return chat.id === chatId
                ? __assign(__assign({}, chat), { messages: newMessages, lastMessage: ((_a = newMessages[newMessages.length - 1]) === null || _a === void 0 ? void 0 : _a.text) || 'New conversation', timestamp: new Date(), formData: formData }) : chat;
        }); });
    };
    // Update chat's form data whenever formData changes
    var updateChatFormData = function (chatId, newFormData) {
        setChats(function (prev) { return prev.map(function (chat) {
            return chat.id === chatId
                ? __assign(__assign({}, chat), { formData: newFormData }) : chat;
        }); });
    };
    var createNewChat = function () {
        var newChatId = Date.now().toString();
        var newChat = {
            id: newChatId,
            title: "Chat " + (chats.length + 1),
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
        setChats(function (prev) { return __spreadArrays(prev, [newChat]); });
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
    var handleSubmit = function (e) {
        var _a;
        e.preventDefault();
        if (!currentInput.trim())
            return;
        var currentQuestion = botQuestions[currentStep];
        addUserMessage(currentInput);
        // Update form data
        var updatedFormData = __assign(__assign({}, formData), (_a = {}, _a[currentQuestion.field] = currentInput, _a));
        setFormData(updatedFormData);
        updateChatFormData(activeChat, updatedFormData);
        setCurrentInput('');
        // Move to next step
        setTimeout(function () {
            if (currentStep < botQuestions.length - 1) {
                setCurrentStep(function (prev) { return prev + 1; });
                addBotMessage(botQuestions[currentStep + 1].text);
            }
            else {
                // Final step - submit to Firebase
                submitFeedback(updatedFormData);
            }
        }, 500);
    };
    var handleRatingClick = function (rating) {
        var ratingText = rating + " star" + (rating !== 1 ? 's' : '');
        addUserMessage(ratingText);
        var updatedFormData = __assign(__assign({}, formData), { rating: rating });
        setFormData(updatedFormData);
        updateChatFormData(activeChat, updatedFormData);
        setTimeout(function () {
            if (currentStep < botQuestions.length - 1) {
                setCurrentStep(function (prev) { return prev + 1; });
                addBotMessage(botQuestions[currentStep + 1].text);
            }
            else {
                // Final step - submit to Firebase
                submitFeedback(updatedFormData);
            }
        }, 500);
    };
    var handleOptionClick = function (option) {
        addUserMessage(option);
        var updatedFormData = __assign(__assign({}, formData), { contactPreference: option });
        setFormData(updatedFormData);
        updateChatFormData(activeChat, updatedFormData);
        setTimeout(function () {
            // Final step - submit to Firebase
            submitFeedback(updatedFormData);
        }, 500);
    };
    var currentQuestion = botQuestions[currentStep];
    var isCompleted = currentStep >= botQuestions.length;
    // Safe data access with fallbacks
    var recentBlogs = ((_a = blog_json_1["default"] === null || blog_json_1["default"] === void 0 ? void 0 : blog_json_1["default"].posts) === null || _a === void 0 ? void 0 : _a.slice(0, 3)) || [];
    var recentHighlights = ((_b = highlights_json_1["default"] === null || highlights_json_1["default"] === void 0 ? void 0 : highlights_json_1["default"].highlights) === null || _b === void 0 ? void 0 : _b.slice(0, 3)) || [];
    return (react_1["default"].createElement("div", { className: "h-screen flex pt-16 bg-background relative" },
        (sidebarOpen || rightSidebarOpen) && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black/50 z-10 lg:hidden xl:hidden", onClick: function () {
                setSidebarOpen(false);
                setRightSidebarOpen(false);
            } })),
        react_1["default"].createElement("div", { className: (sidebarOpen ? 'w-80' : 'w-0') + " transition-all duration-300 bg-card border-r border-border flex flex-col overflow-hidden lg:relative absolute left-0 top-16 h-[calc(100vh-4rem)] z-20 lg:z-auto lg:h-auto lg:top-0" },
            react_1["default"].createElement("div", { className: "p-3 sm:p-4 border-b border-border" },
                react_1["default"].createElement("div", { className: "flex items-center justify-between mb-4" },
                    react_1["default"].createElement("h2", { className: "text-lg font-semibold text-foreground" }, "Conversations"),
                    react_1["default"].createElement("button", { onClick: createNewChat, className: "p-2 hover:bg-muted rounded-lg transition-colors", title: "New Chat" },
                        react_1["default"].createElement(lucide_react_1.Plus, { className: "h-4 w-4" }))),
                react_1["default"].createElement("button", { onClick: createNewChat, className: "w-full p-2 sm:p-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2" },
                    react_1["default"].createElement(lucide_react_1.Plus, { className: "h-4 w-4" }),
                    "Start New Chat")),
            react_1["default"].createElement("div", { className: "flex-1 overflow-y-auto" }, chats.map(function (chat) { return (react_1["default"].createElement("button", { key: chat.id, onClick: function () { return setActiveChat(chat.id); }, className: "w-full p-3 sm:p-4 text-left hover:bg-muted transition-colors border-b border-border/50 " + (activeChat === chat.id ? 'bg-muted' : '') },
                react_1["default"].createElement("div", { className: "flex items-start gap-3" },
                    react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" },
                        react_1["default"].createElement(lucide_react_1.MessageSquare, { className: "h-5 w-5 text-primary" })),
                    react_1["default"].createElement("div", { className: "flex-1 min-w-0" },
                        react_1["default"].createElement("h3", { className: "text-sm sm:text-base font-medium text-foreground truncate" }, chat.formData.name ? chat.formData.name + "'s Feedback" : chat.title),
                        react_1["default"].createElement("p", { className: "text-xs sm:text-sm text-muted-foreground truncate" }, chat.lastMessage),
                        react_1["default"].createElement("div", { className: "flex items-center gap-1 mt-1" },
                            react_1["default"].createElement(lucide_react_1.Calendar, { className: "h-3 w-3 text-muted-foreground" }),
                            react_1["default"].createElement("span", { className: "text-xs text-muted-foreground" }, chat.timestamp.toLocaleDateString())))))); }))),
        react_1["default"].createElement("div", { className: "flex-1 flex flex-col" },
            react_1["default"].createElement("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b border-border p-4 sm:p-6" },
                react_1["default"].createElement("div", { className: "max-w-4xl mx-auto" },
                    react_1["default"].createElement("div", { className: "text-center mb-4" },
                        react_1["default"].createElement("h1", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-2" }, "Aman Asks"),
                        react_1["default"].createElement("p", { className: "text-base sm:text-lg text-muted-foreground px-4" }, "Your feedback matters \u2022 Let's connect and grow together")),
                    react_1["default"].createElement("div", { className: "flex flex-col sm:flex-row items-center gap-3 text-center justify-center" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                            react_1["default"].createElement(lucide_react_1.Heart, { className: "h-5 w-5 text-red-500" }),
                            react_1["default"].createElement("p", { className: "text-sm sm:text-base text-foreground font-medium" }, "This is not a chatbot! This will help Aman get feedback and possibly book a chat with you in the future."))),
                    react_1["default"].createElement("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 text-sm text-muted-foreground" },
                        react_1["default"].createElement("a", { href: "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=amanhiranpurohit", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center px-4 py-2 text-center outline-none no-underline text-white w-full sm:w-48 h-10 sm:h-8 rounded-full bg-[#0A66C2] font-sans text-sm mt-2 sm:mt-0" }, "Follow on LinkedIn")))),
            react_1["default"].createElement("div", { className: "bg-card border-b border-border p-3 sm:p-4 flex items-center justify-between" },
                react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                    react_1["default"].createElement("button", { onClick: function () { return setSidebarOpen(!sidebarOpen); }, className: "p-2 hover:bg-muted rounded-lg transition-colors lg:hidden" },
                        react_1["default"].createElement(lucide_react_1.MessageSquare, { className: "h-4 w-4" })),
                    react_1["default"].createElement("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.Bot, { className: "h-5 w-5 text-primary-foreground" })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h3", { className: "font-semibold text-foreground" }, "Feedback Assistant"),
                        react_1["default"].createElement("p", { className: "text-sm text-muted-foreground" }, "Collecting thoughts for Aman"))),
                react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                    react_1["default"].createElement("button", { onClick: function () { return setRightSidebarOpen(!rightSidebarOpen); }, className: "p-2 hover:bg-muted rounded-lg transition-colors xl:hidden", title: "Toggle Links" },
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-4 w-4" })),
                    react_1["default"].createElement("div", { className: "flex items-center gap-1" },
                        react_1["default"].createElement("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
                        react_1["default"].createElement("span", { className: "text-xs text-muted-foreground" }, "Online")))),
            react_1["default"].createElement("div", { className: "flex-1 overflow-y-auto p-4 sm:p-6" },
                react_1["default"].createElement(framer_motion_1.AnimatePresence, null, messages.map(function (message) { return (react_1["default"].createElement(framer_motion_1.motion.div, { key: message.id, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, className: "flex gap-3 mb-6 " + (message.isBot ? 'justify-start' : 'justify-end') },
                    message.isBot && (react_1["default"].createElement("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0" },
                        react_1["default"].createElement(lucide_react_1.Bot, { className: "h-4 w-4 text-primary-foreground" }))),
                    react_1["default"].createElement("div", { className: "max-w-[280px] sm:max-w-xs md:max-w-md p-3 sm:p-4 rounded-2xl shadow-sm " + (message.isBot
                            ? 'bg-muted text-foreground rounded-bl-sm'
                            : 'bg-primary text-primary-foreground rounded-br-sm') },
                        react_1["default"].createElement("p", { className: "text-sm leading-relaxed" }, message.text),
                        react_1["default"].createElement("p", { className: "text-xs opacity-70 mt-2" }, message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))),
                    !message.isBot && (react_1["default"].createElement("div", { className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0" },
                        react_1["default"].createElement(lucide_react_1.User, { className: "h-4 w-4 text-secondary-foreground" }))))); })),
                (isTyping || isSubmitting) && (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "flex gap-3 mb-6" },
                    react_1["default"].createElement("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.Bot, { className: "h-4 w-4 text-primary-foreground" })),
                    react_1["default"].createElement("div", { className: "bg-muted p-4 rounded-2xl rounded-bl-sm shadow-sm" },
                        react_1["default"].createElement("div", { className: "flex gap-1 items-center" }, isSubmitting ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-500 animate-spin" }),
                            react_1["default"].createElement("span", { className: "text-sm text-muted-foreground ml-2" }, "Saving your feedback..."))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("div", { className: "w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" }),
                            react_1["default"].createElement("div", { className: "w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }),
                            react_1["default"].createElement("div", { className: "w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce", style: { animationDelay: '0.2s' } }))))))),
                react_1["default"].createElement("div", { ref: messagesEndRef })),
            !isCompleted && !isTyping && !isSubmitting && (react_1["default"].createElement("div", { className: "p-3 sm:p-4 border-t border-border bg-card" },
                (currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.type) === 'rating' ? (react_1["default"].createElement("div", { className: "flex flex-col gap-4" },
                    react_1["default"].createElement("p", { className: "text-sm text-muted-foreground text-center" }, "Rate your experience:"),
                    react_1["default"].createElement("div", { className: "flex gap-1 sm:gap-2 justify-center" }, [1, 2, 3, 4, 5].map(function (star) { return (react_1["default"].createElement("button", { key: star, onClick: function () { return handleRatingClick(star); }, className: "text-xl sm:text-2xl hover:scale-110 transition-transform p-2 sm:p-2" },
                        react_1["default"].createElement(lucide_react_1.Star, { className: "h-6 w-6 sm:h-8 sm:w-8 fill-current text-yellow-400 hover:text-yellow-300" }))); })))) : (currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.type) === 'options' ? (react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                    react_1["default"].createElement("p", { className: "text-sm text-muted-foreground text-center mb-2" }, "Choose an option:"),
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-2" }, (_c = currentQuestion.options) === null || _c === void 0 ? void 0 : _c.map(function (option) { return (react_1["default"].createElement("button", { key: option, onClick: function () { return handleOptionClick(option); }, className: "p-3 text-left text-sm sm:text-base rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors" }, option)); })))) : (react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "flex gap-2 sm:gap-3" },
                    react_1["default"].createElement("input", { type: (currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.field) === 'email' ? 'email' : 'text', value: currentInput, onChange: function (e) { return setCurrentInput(e.target.value); }, placeholder: "Type your message...", className: "flex-1 p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary", required: true }),
                    react_1["default"].createElement("button", { type: "submit", disabled: !currentInput.trim(), className: "p-2 sm:p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" },
                        react_1["default"].createElement(lucide_react_1.Send, { className: "h-4 w-4 sm:h-5 sm:w-5" })))),
                submitError && (react_1["default"].createElement("div", { className: "mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm" }, submitError)))),
            isCompleted && (react_1["default"].createElement("div", { className: "p-4 sm:p-6 border-t border-border bg-card text-center" },
                react_1["default"].createElement("div", { className: "text-green-600 mb-3" },
                    react_1["default"].createElement(lucide_react_1.MessageSquare, { className: "h-10 w-10 mx-auto" })),
                react_1["default"].createElement("p", { className: "text-foreground font-medium mb-2" }, "Thank you for your feedback!"),
                react_1["default"].createElement("p", { className: "text-sm text-muted-foreground" }, "Aman will review your message and get back to you soon.")))),
        react_1["default"].createElement("div", { className: (rightSidebarOpen ? 'w-80' : 'w-0') + " transition-all duration-300 bg-card border-l border-border flex flex-col overflow-hidden xl:relative absolute right-0 top-16 h-[calc(100vh-4rem)] z-20 xl:z-auto xl:h-auto xl:top-0" },
            react_1["default"].createElement("div", { className: "p-3 sm:p-4 border-b border-border" },
                react_1["default"].createElement("h3", { className: "text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4" }, "Connect with Aman"),
                react_1["default"].createElement("div", { className: "space-y-3" },
                    react_1["default"].createElement("a", { href: footer_json_1["default"].github, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group" },
                        react_1["default"].createElement(lucide_react_1.Github, { className: "h-5 w-5 text-muted-foreground group-hover:text-foreground" }),
                        react_1["default"].createElement("span", { className: "text-xs sm:text-sm font-medium" }, "GitHub"),
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })),
                    react_1["default"].createElement("a", { href: footer_json_1["default"].linkedin, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group" },
                        react_1["default"].createElement(lucide_react_1.Linkedin, { className: "h-5 w-5 text-muted-foreground group-hover:text-foreground" }),
                        react_1["default"].createElement("span", { className: "text-sm font-medium" }, "LinkedIn"),
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })),
                    react_1["default"].createElement("a", { href: footer_json_1["default"].medium, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group" },
                        react_1["default"].createElement(lucide_react_1.BookOpen, { className: "h-5 w-5 text-muted-foreground group-hover:text-foreground" }),
                        react_1["default"].createElement("span", { className: "text-sm font-medium" }, "Medium"),
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })),
                    react_1["default"].createElement("a", { href: footer_json_1["default"].instagram, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group" },
                        react_1["default"].createElement(lucide_react_1.Instagram, { className: "h-5 w-5 text-muted-foreground group-hover:text-foreground" }),
                        react_1["default"].createElement("span", { className: "text-sm font-medium" }, "Instagram"),
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })),
                    react_1["default"].createElement("a", { href: "mailto:" + footer_json_1["default"].email, className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group" },
                        react_1["default"].createElement(lucide_react_1.Mail, { className: "h-5 w-5 text-muted-foreground group-hover:text-foreground" }),
                        react_1["default"].createElement("span", { className: "text-sm font-medium" }, "Email"),
                        react_1["default"].createElement(lucide_react_1.ExternalLink, { className: "h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })))),
            react_1["default"].createElement("div", { className: "p-3 sm:p-4 border-b border-border" },
                react_1["default"].createElement("div", { className: "flex items-center justify-between mb-3 sm:mb-4" },
                    react_1["default"].createElement("h3", { className: "text-base sm:text-lg font-semibold text-foreground" }, "Recent Blogs"),
                    react_1["default"].createElement(link_1["default"], { href: "/blog", className: "text-sm text-primary hover:underline" }, "View all")),
                react_1["default"].createElement("div", { className: "space-y-3" }, recentBlogs.map(function (blog) { return (react_1["default"].createElement(link_1["default"], { key: blog.id, href: "/blog/" + blog.slug, className: "block p-2 sm:p-3 rounded-lg hover:bg-muted transition-colors group" },
                    react_1["default"].createElement("h4", { className: "text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2" }, blog.title),
                    react_1["default"].createElement("p", { className: "text-xs text-muted-foreground mt-1" }, blog.readTime),
                    react_1["default"].createElement("div", { className: "flex items-center gap-1 mt-2" },
                        react_1["default"].createElement("span", { className: "text-xs text-muted-foreground" }, "Read more"),
                        react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "h-3 w-3 text-muted-foreground" })))); }))),
            react_1["default"].createElement("div", { className: "p-3 sm:p-4 flex-1 overflow-y-auto" },
                react_1["default"].createElement("div", { className: "flex items-center justify-between mb-3 sm:mb-4" },
                    react_1["default"].createElement("h3", { className: "text-base sm:text-lg font-semibold text-foreground" }, "Highlights"),
                    react_1["default"].createElement(link_1["default"], { href: "/blog", className: "text-sm text-primary hover:underline" }, "View all")),
                react_1["default"].createElement("div", { className: "space-y-3" }, recentHighlights.map(function (highlight) { return (react_1["default"].createElement("div", { key: highlight.id, className: "p-2 sm:p-3 rounded-lg border border-border/50" },
                    react_1["default"].createElement("div", { className: "flex items-start gap-2 mb-2" },
                        react_1["default"].createElement(lucide_react_1.Zap, { className: "h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" }),
                        react_1["default"].createElement("h4", { className: "text-xs sm:text-sm font-medium text-foreground line-clamp-2" }, highlight.title)),
                    react_1["default"].createElement("p", { className: "text-xs text-muted-foreground line-clamp-3 mb-2" }, highlight.description),
                    react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                        react_1["default"].createElement("span", { className: "text-xs text-muted-foreground" }, highlight.date),
                        highlight.link && (react_1["default"].createElement("a", { href: highlight.link, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary hover:underline" }, "View"))))); }))))));
};
exports["default"] = AmanAsksPage;
