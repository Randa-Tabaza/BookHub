import { useState } from "react";
import { BookMarked, Bell, User, BookOpen, List, Settings, Crown, Search, LogOut, Heart, TrendingUp, Star, MessageSquare, ThumbsUp, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserDashboardProps {
  onLogout: () => void;
  onLogoClick?: () => void;
  onViewNotifications?: () => void;
  onViewSubscription?: () => void;
  onViewChat?: () => void;
  onEditProfile?: () => void;
  currentUser: {
    username: string;
    email: string;
    avatarUrl?: string;
  };
  userLists: Array<{id: number; name: string; count: number; bookIds: number[]; icon: any}>;
  setUserLists: React.Dispatch<React.SetStateAction<Array<{id: number; name: string; count: number; bookIds: number[]; icon: any}>>>;
  listIcons: any[];
  onViewList?: (list: {id: number; name: string; count: number; bookIds: number[]; icon: any}) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function UserDashboard({ onLogout, onLogoClick, onViewNotifications, onViewSubscription, onViewChat, onEditProfile, currentUser, userLists, setUserLists, listIcons, onViewList, theme, onToggleTheme }: UserDashboardProps) {
  const [unreadCount] = useState(3);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [editListName, setEditListName] = useState("");

  // User data
  const userName = currentUser.username;
  const userInitials = currentUser.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Recent book discussions data
  const recentDiscussions = [
    {
      id: 1,
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      userName: "Emma Wilson",
      userInitials: "EW",
      content: "Just finished this book and I'm still processing! The concept of exploring different life paths is so fascinating. What did you all think about Nora's journey?",
      timestamp: "2 hours ago",
      likes: 24,
      replies: 2,
    },
    {
      id: 2,
      bookTitle: "Project Hail Mary",
      author: "Andy Weir",
      userName: "David Kim",
      userInitials: "DK",
      content: "The science in this book is AMAZING! Andy Weir really did his research. Rocky is my favorite character ever!",
      timestamp: "3 hours ago",
      likes: 42,
      replies: 1,
    },
    {
      id: 3,
      bookTitle: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      userName: "Olivia Martinez",
      userInitials: "OM",
      content: "This book absolutely destroyed me (in the best way). Evelyn and Celia's story... I'm not crying, you're crying!",
      timestamp: "6 hours ago",
      likes: 56,
      replies: 3,
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      rating: 4.6,
      reason: "Based on your love for literary fiction"
    },
    {
      id: 2,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      rating: 4.7,
      reason: "Because you liked Atomic Habits"
    },
    {
      id: 3,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      rating: 4.3,
      reason: "Trending in your favorite genres"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.5,
      reason: "Popular among your connections"
    }
  ];

  const handleNotificationClick = () => {
    if (onViewNotifications) {
      onViewNotifications();
    }
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    
    const newList = {
      id: Date.now(),
      name: newListName,
      count: 0,
      bookIds: [],
      icon: listIcons[Math.floor(Math.random() * listIcons.length)]
    };
    
    setUserLists([...userLists, newList]);
    setNewListName("");
    setIsCreateListOpen(false);
  };

  const handleEditList = (listId: number) => {
    if (!editListName.trim()) return;
    
    setUserLists(userLists.map(list => 
      list.id === listId ? { ...list, name: editListName } : list
    ));
    setEditingListId(null);
    setEditListName("");
  };

  const handleDeleteList = (listId: number) => {
    setUserLists(userLists.filter(list => list.id !== listId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={onLogoClick || onLogout}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BookMarked className="w-6 h-6 text-primary" />
              <span className="text-xl">BookHub</span>
            </button>
            
            <div className="hidden md:block w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search books, authors, genres..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewChat}
              className="hidden md:flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Discussions</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <Button 
              size="sm" 
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-background border-2 border-yellow-400"
              onClick={onViewSubscription}
            >
              <Crown className="w-4 h-4" />
              Upgrade
            </Button>

            <button onClick={onEditProfile} className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
              <Avatar className="w-8 h-8 cursor-pointer border-2 border-primary hover:border-primary/80 transition-colors">
                {currentUser.avatarUrl ? (
                  <AvatarImage src={currentUser.avatarUrl} alt={userName} />
                ) : null}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <ScrollArea className="h-full py-6 px-4">
            <div className="space-y-1">
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={onEditProfile}
              >
                <User className="w-4 h-4 mr-3" />
                My Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onViewNotifications}
              >
                <Bell className="w-4 h-4 mr-3" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-auto bg-destructive">{unreadCount}</Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onViewSubscription}
              >
                <Crown className="w-4 h-4 mr-3" />
                Subscription
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Message */}
              <div>
                <h1 className="text-3xl mb-2">Welcome back, {userName}!</h1>
                <p className="text-muted-foreground">Ready to discover your next favorite book?</p>
              </div>

              {/* Personalized Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recommended for You
                  </CardTitle>
                  <CardDescription>Based on your reading history and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((book) => (
                      <div key={book.id} className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                        <div className="w-20 h-28 bg-gradient-to-br from-primary to-primary/60 rounded flex-shrink-0 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white opacity-50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="line-clamp-1 mb-1">{book.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm">{book.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground italic">{book.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Book Discussions Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Book Discussions
                    </CardTitle>
                    <CardDescription>Join the conversation about your favorite books</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onViewChat}
                  >
                    View All Discussions
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDiscussions.map((discussion) => (
                      <div 
                        key={discussion.id} 
                        className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                        onClick={onViewChat}
                      >
                        <div className="flex gap-3">
                          <Avatar className="w-10 h-10 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {discussion.userInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <span className="text-sm">{discussion.userName}</span>
                                <span className="text-sm text-muted-foreground"> • {discussion.timestamp}</span>
                              </div>
                            </div>
                            <div className="mb-2">
                              <Badge variant="outline" className="text-xs mb-2">
                                {discussion.bookTitle} by {discussion.author}
                              </Badge>
                            </div>
                            <p className="text-sm mb-3 line-clamp-2">{discussion.content}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{discussion.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <span>{discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* My Lists */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <List className="w-5 h-5" />
                      My Lists
                    </CardTitle>
                    <CardDescription>Create and manage your custom reading collections</CardDescription>
                  </div>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => setIsCreateListOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create List
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userLists.map((list) => {
                      const Icon = list.icon;
                      return (
                        <div
                          key={list.id}
                          className="relative group p-4 rounded-lg border border-border hover:border-primary transition-colors bg-card"
                        >
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingListId(list.id);
                                    setEditListName(list.name);
                                  }}
                                >
                                  <Edit2 className="w-4 h-4 mr-2" />
                                  Rename List
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteList(list.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete List
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="w-full text-left">
                            <button 
                              className="w-full text-left hover:opacity-80 transition-opacity"
                              onClick={() => onViewList && onViewList(list)}
                            >
                              <Icon className="w-6 h-6 text-primary mb-2" />
                              <h4 className="text-sm mb-1 pr-8">{list.name}</h4>
                              <p className="text-2xl">{list.count}</p>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
        </main>
      </div>

      {/* Create List Dialog */}
      <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
            <DialogDescription>
              Give your reading list a custom name to organize your books.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="e.g., Summer Reading, Book Club, Sci-Fi Favorites..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateList();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => {
              setIsCreateListOpen(false);
              setNewListName("");
            }}>
              Cancel
            </Button>
            <Button onClick={handleCreateList} disabled={!newListName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit List Dialog */}
      <Dialog open={editingListId !== null} onOpenChange={(open:boolean) => {
        if (!open) {
          setEditingListId(null);
          setEditListName("");
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename List</DialogTitle>
            <DialogDescription>
              Update the name of your reading list.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter new list name..."
              value={editListName}
              onChange={(e) => setEditListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && editingListId !== null) {
                  handleEditList(editingListId);
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => {
              setEditingListId(null);
              setEditListName("");
            }}>
              Cancel
            </Button>
            <Button onClick={() => editingListId !== null && handleEditList(editingListId)} disabled={!editListName.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}