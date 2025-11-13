import { useState } from "react";
import { Bell, ArrowLeft, Moon, Sun, Settings, Check, CheckCheck, Star, Heart, BookOpen, Users, TrendingUp, AlertCircle, MessageSquare, Mail, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Notification {
  id: number;
  type: "review" | "follow" | "recommendation" | "system" | "comment" | "rating" | "trending";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  bookTitle?: string;
  userName?: string;
}

interface NotificationsPageProps {
  onBack: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function NotificationsPage({ onBack, theme, onToggleTheme }: NotificationsPageProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "read">("all");
  const [showSettings, setShowSettings] = useState(false);
  
  // Email settings
  const [notificationEmail, setNotificationEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSaveSuccess, setEmailSaveSuccess] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    newReviews: true,
    newFollowers: true,
    bookRecommendations: true,
    systemUpdates: false,
    weeklyDigest: true,
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    newReviews: true,
    newFollowers: true,
    bookRecommendations: true,
    systemUpdates: true,
    comments: true,
    ratings: true,
  });

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "review",
      title: "New Review on Your List",
      message: "Sarah Johnson reviewed 'The Midnight Library' that you added to your Want to Read list.",
      timestamp: "2 hours ago",
      isRead: false,
      bookTitle: "The Midnight Library",
      userName: "Sarah Johnson",
    },
    {
      id: 2,
      type: "follow",
      title: "New Follower",
      message: "Alex Chen started following you.",
      timestamp: "5 hours ago",
      isRead: false,
      userName: "Alex Chen",
    },
    {
      id: 3,
      type: "recommendation",
      title: "Book Recommendation",
      message: "Based on your reading history, you might like 'Tomorrow, and Tomorrow, and Tomorrow'.",
      timestamp: "1 day ago",
      isRead: false,
      bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    },
    {
      id: 4,
      type: "comment",
      title: "New Comment",
      message: "Emma Wilson replied to your review of 'Project Hail Mary'.",
      timestamp: "1 day ago",
      isRead: true,
      bookTitle: "Project Hail Mary",
      userName: "Emma Wilson",
    },
    {
      id: 5,
      type: "rating",
      title: "Book Rating",
      message: "Your review of 'Atomic Habits' received 12 helpful votes.",
      timestamp: "2 days ago",
      isRead: true,
      bookTitle: "Atomic Habits",
    },
    {
      id: 6,
      type: "trending",
      title: "Trending Book",
      message: "'Fourth Wing' is trending in Fantasy. Check it out!",
      timestamp: "2 days ago",
      isRead: true,
      bookTitle: "Fourth Wing",
    },
    {
      id: 7,
      type: "system",
      title: "System Update",
      message: "BookHub has been updated with new features! Check out our improved book recommendations.",
      timestamp: "3 days ago",
      isRead: true,
    },
    {
      id: 8,
      type: "follow",
      title: "New Follower",
      message: "Marcus Lee started following you.",
      timestamp: "4 days ago",
      isRead: true,
      userName: "Marcus Lee",
    },
    {
      id: 9,
      type: "review",
      title: "Friend's Review",
      message: "Your friend David posted a review of 'The Seven Husbands of Evelyn Hugo'.",
      timestamp: "5 days ago",
      isRead: true,
      bookTitle: "The Seven Husbands of Evelyn Hugo",
      userName: "David",
    },
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "review":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <Users className="w-5 h-5 text-purple-500" />;
      case "recommendation":
        return <BookOpen className="w-5 h-5 text-primary" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case "rating":
        return <Star className="w-5 h-5 text-yellow-500" />;
      case "trending":
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case "system":
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveEmail = () => {
    setEmailError("");
    setEmailSaveSuccess(false);

    if (!notificationEmail) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(notificationEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Save the email
    setSavedEmail(notificationEmail);
    setEmailSaveSuccess(true);
    
    // Simulate sending verification email
    setTimeout(() => {
      setEmailVerified(true);
    }, 2000);

    setTimeout(() => {
      setEmailSaveSuccess(false);
    }, 3000);
  };

  const handleSendVerification = () => {
    setEmailSaveSuccess(true);
    setTimeout(() => {
      setEmailSaveSuccess(false);
    }, 3000);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === "unread") return !notif.isRead;
    if (activeFilter === "read") return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              <span className="text-xl">Notifications</span>
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Notification Settings</DialogTitle>
                  <DialogDescription>
                    Manage how you receive notifications from BookHub
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Email Address Section */}
                  <div className="bg-accent/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <h3 className="text-lg">Email Address for Notifications</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your email address to receive notifications about your BookHub activity
                    </p>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="notification-email">Email Address</Label>
                        <div className="flex gap-2">
                          <Input
                            id="notification-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={notificationEmail}
                            onChange={(e) => {
                              setNotificationEmail(e.target.value);
                              setEmailError("");
                            }}
                            className={emailError ? "border-destructive" : ""}
                          />
                          <Button 
                            onClick={handleSaveEmail}
                            disabled={!notificationEmail}
                          >
                            Save Email
                          </Button>
                        </div>
                        {emailError && (
                          <p className="text-sm text-destructive">{emailError}</p>
                        )}
                        {emailSaveSuccess && (
                          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <Check className="w-4 h-4" />
                            <span>Email saved successfully!</span>
                          </div>
                        )}
                      </div>

                      {savedEmail && (
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between p-3 bg-background rounded-md border border-border">
                            <div className="flex items-center gap-3">
                              <div className={`flex items-center gap-2 ${emailVerified ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                                {emailVerified ? (
                                  <>
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-sm">Verified</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Not verified</span>
                                  </>
                                )}
                              </div>
                              <Separator orientation="vertical" className="h-4" />
                              <span className="text-sm">{savedEmail}</span>
                            </div>
                            {!emailVerified && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleSendVerification}
                              >
                                Verify Email
                              </Button>
                            )}
                          </div>
                          {!emailVerified && (
                            <p className="text-xs text-muted-foreground">
                              Please verify your email to start receiving notifications
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg mb-2">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose which notifications you want to receive via email
                      {!savedEmail && " (Email address required)"}
                    </p>
                    <div className={`space-y-4 ${!savedEmail ? "opacity-50 pointer-events-none" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Reviews</div>
                          <div className="text-sm text-muted-foreground">
                            When someone reviews books on your lists
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications.newReviews}
                          onCheckedChange={(checked: boolean) =>
                            setEmailNotifications({ ...emailNotifications, newReviews: checked })
                          }
                          disabled={!savedEmail}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Followers</div>
                          <div className="text-sm text-muted-foreground">
                            When someone follows you
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications.newFollowers}
                          onCheckedChange={(checked: boolean) =>
                            setEmailNotifications({ ...emailNotifications, newFollowers: checked })
                          }
                          disabled={!savedEmail}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Book Recommendations</div>
                          <div className="text-sm text-muted-foreground">
                            Personalized book suggestions based on your taste
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications.bookRecommendations}
                          onCheckedChange={(checked: boolean) =>
                            setEmailNotifications({ ...emailNotifications, bookRecommendations: checked })
                          }
                          disabled={!savedEmail}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">System Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Important platform updates and announcements
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications.systemUpdates}
                          onCheckedChange={(checked: boolean) =>
                            setEmailNotifications({ ...emailNotifications, systemUpdates: checked })
                          }
                          disabled={!savedEmail}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Weekly Digest</div>
                          <div className="text-sm text-muted-foreground">
                            Weekly summary of your reading activity
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications.weeklyDigest}
                          onCheckedChange={(checked: boolean) =>
                            setEmailNotifications({ ...emailNotifications, weeklyDigest: checked })
                          }
                          disabled={!savedEmail}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* In-App Notifications */}
                  <div>
                    <h3 className="text-lg mb-4">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Reviews</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications for new reviews
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.newReviews}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, newReviews: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Followers</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications when someone follows you
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.newFollowers}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, newFollowers: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Book Recommendations</div>
                          <div className="text-sm text-muted-foreground">
                            Show book suggestions in-app
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.bookRecommendations}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, bookRecommendations: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">System Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Show system announcements
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.systemUpdates}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, systemUpdates: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Comments</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications for comments on your reviews
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.comments}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, comments: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Ratings</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications for helpful votes on your reviews
                          </div>
                        </div>
                        <Switch
                          checked={inAppNotifications.ratings}
                          onCheckedChange={(checked: boolean) =>
                            setInAppNotifications({ ...inAppNotifications, ratings: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="hover:bg-accent"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-1">Your Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your reading community
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={(value: string) => setActiveFilter(value as any)}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-destructive text-destructive-foreground">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">
              Read
              <Badge variant="secondary" className="ml-2">
                {notifications.length - unreadCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeFilter}>
            <ScrollArea className="h-[calc(100vh-300px)]">
              {filteredNotifications.length === 0 ? (
                <Card className="p-12 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeFilter === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </Card>
              ) : (
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`p-4 transition-all hover:border-primary/40 ${
                        !notification.isRead ? "bg-accent/20 border-primary/20" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className={!notification.isRead ? "font-semibold" : ""}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            <div className="flex gap-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Mark as Read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
