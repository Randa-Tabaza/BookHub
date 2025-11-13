import { useState, useEffect } from "react";
import {
  BookMarked,
  BookOpen,
  Star,
  Users,
  TrendingUp,
  Search,
  Menu,
  X,
  Crown,
  Heart,
  List,
  User,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";
import { ThemeToggle } from "./components/ThemeToggle";
import { BookCard } from "./components/BookCard";
import { AdminDashboard } from "./components/AdminDashboard";
import { LoginPage } from "./components/LoginPage";
import { AuthorLoginPage } from "./components/AuthorLoginPage";
import { AuthorVerificationPage } from "./components/AuthorVerificationPage";
import { AuthorRegistrationPage } from "./components/AuthorRegistrationPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { AuthorNotificationsPage } from "./components/AuthorNotificationsPage";
import { AuthorEditProfilePage } from "./components/AuthorEditProfilePage";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { UserDashboard } from "./components/UserDashboard";
import { AuthorDashboard } from "./components/AuthorDashboard";
import { BrowseBooksPage } from "./components/BrowseBooksPage";
import { BookDetailsPage } from "./components/BookDetailsPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { SubscriptionPage } from "./components/SubscriptionPage";
import { ChatPage } from "./components/ChatPage";
import { EditProfilePage } from "./components/EditProfilePage";
import { AuthorPublicProfilePage } from "./components/AuthorPublicProfilePage";
import { AdminReportsPage } from "./components/AdminReportsPage";
import { ListViewPage } from "./components/ListViewPage";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  totalRatings: number;
  genre: string;
  description: string;
  publishYear: number;
}

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
  website?: string;
  location?: string;
  joinDate: string;
  verified: boolean;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  stats: {
    totalBooks: number;
    totalReads: number;
    totalRatings: number;
    avgRating: number;
    followers: number;
  };
  books: Book[];
}

const heroImage =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop";

export default function App() {
  // Enhanced theme with deeper dark mode and richer light mode colors
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "login"
    | "author"
    | "author-verification"
    | "author-registration"
    | "admin"
    | "dashboard"
    | "author-dashboard"
    | "admin-dashboard"
    | "admin-reports"
    | "browse"
    | "book-details"
    | "notifications"
    | "subscription"
    | "chat"
    | "edit-profile"
    | "author-profile"
    | "list-view"
  >("home");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedBookId, setSelectedBookId] =
    useState<number>(1);
  const [selectedAuthorId, setSelectedAuthorId] =
    useState<number>(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAuthorLoggedIn, setIsAuthorLoggedIn] =
    useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedListName, setSelectedListName] =
    useState<string>("");
  const [previousPage, setPreviousPage] = useState<
    "home" | "browse"
  >("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatarUrl: "",
  });
  const [currentAuthor, setCurrentAuthor] = useState({
    name: "Author Name",
    email: "author@email.com",
    avatarUrl: "",
  });

  // User's custom lists
  const listIcons = [
    Heart,
    BookOpen,
    Star,
    List,
    TrendingUp,
    BookMarked,
  ];
  const [userLists, setUserLists] = useState<
    Array<{
      id: number;
      name: string;
      count: number;
      bookIds: number[];
      icon: any;
    }>
  >([]);

  useEffect(() => {
    // Apply theme to document root
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Book data arrays
  const trendingBooks: Book[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.5,
      totalRatings: 12847,
      cover:
        "https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc2MTgzMTA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Fiction",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
      publishYear: 2020,
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.7,
      totalRatings: 18293,
      cover:
        "https://images.unsplash.com/photo-1711185900806-bf85e7fe7767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTc3NDExMHww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Sci-Fi",
      description:
        "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the author of The Martian.",
      publishYear: 2021,
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.6,
      totalRatings: 15672,
      cover:
        "https://images.unsplash.com/photo-1739521949473-a703e0536ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzYxNzMxNjY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Historical Fiction",
      description:
        "A reclusive Hollywood icon opens up about her glamorous and scandalous life to an unknown magazine reporter.",
      publishYear: 2017,
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.4,
      totalRatings: 21456,
      cover:
        "https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwbm92ZWwlMjBjb3ZlcnxlbnwxfHx8fDE3NjE4MzE1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Mystery",
      description:
        "A famous painter married to an in-demand fashion photographer becomes a household name after shooting her husband and then never speaking another word again.",
      publishYear: 2019,
    },
  ];

  const newReleases: Book[] = [
    {
      id: 5,
      title: "The Measure",
      author: "Nikki Erlick",
      rating: 4.3,
      totalRatings: 3842,
      cover:
        "https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYxNzQ4NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Contemporary",
      description:
        "Eight ordinary people. One extraordinary choice. It seems like any other day when a mysterious box appears at people's doors containing a string the exact length of their lives.",
      publishYear: 2022,
    },
    {
      id: 6,
      title: "Happy Place",
      author: "Emily Henry",
      rating: 4.2,
      totalRatings: 5621,
      cover:
        "https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc2MTgzMTA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Romance",
      description:
        "A couple who broke up months ago pretend to still be together for one last week at their annual beach vacation with their best friends.",
      publishYear: 2023,
    },
    {
      id: 7,
      title: "Holly",
      author: "Stephen King",
      rating: 4.1,
      totalRatings: 4387,
      cover:
        "https://images.unsplash.com/photo-1657550650205-a351418bbf89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9vayUyMHNwaW5lfGVufDF8fHx8MTc2MTgzMTU0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Horror",
      description:
        "Holly Gibney, one of King's most compelling characters, returns in a riveting novel about good vs. evil in a small Midwest town.",
      publishYear: 2023,
    },
    {
      id: 8,
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      rating: 4.5,
      totalRatings: 8934,
      cover:
        "https://images.unsplash.com/photo-1711185900806-bf85e7fe7767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTc3NDExMHww&ixlib=rb-4.1.0&q=80&w=1080",
      genre: "Fantasy",
      description:
        "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, but her mother ordered her to join the riders.",
      publishYear: 2023,
    },
  ];

  // Mock function to get author profile data
  const getAuthorProfile = (authorName: string): Author => {
    const allBooks = [...trendingBooks, ...newReleases];
    const authorBooks = allBooks.filter(
      (book) => book.author === authorName,
    );
    const totalRatings = authorBooks.reduce(
      (sum, book) => sum + book.totalRatings,
      0,
    );
    const avgRating =
      authorBooks.length > 0
        ? authorBooks.reduce(
            (sum, book) => sum + book.rating,
            0,
          ) / authorBooks.length
        : 0;

    return {
      id: Math.random(),
      name: authorName,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`,
      bio: `${authorName} is a talented author known for captivating storytelling and deep character development. With a passion for writing that spans multiple genres, they have created works that resonate with readers worldwide.\\n\\nTheir books explore complex themes and emotions, offering readers both entertainment and thought-provoking narratives. Each story is crafted with care, attention to detail, and a unique voice that sets their work apart.`,
      website: `https://${authorName.toLowerCase().replace(/\\s+/g, "")}.com`,
      location: "New York, USA",
      joinDate: "January 2020",
      verified: true,
      socialLinks: {
        twitter: `@${authorName.split(" ")[0].toLowerCase()}`,
        instagram: `@${authorName.split(" ")[0].toLowerCase()}writes`,
        facebook: authorName.replace(/\\s+/g, ""),
      },
      stats: {
        totalBooks: authorBooks.length,
        totalReads: authorBooks.reduce(
          (sum, book) =>
            sum + Math.floor(book.totalRatings * 5),
          0,
        ),
        totalRatings: totalRatings,
        avgRating: avgRating,
        followers: Math.floor(totalRatings * 0.3),
      },
      books: authorBooks,
    };
  };

  // Helper function to get book by ID
  const getBookById = (bookId: number): Book => {
    const allBooks = [...trendingBooks, ...newReleases];
    return (
      allBooks.find((book) => book.id === bookId) || allBooks[0]
    );
  };

  // Helper function to get author by ID
  const getAuthorProfileById = (authorId: number): Author => {
    // For now, just return a default author since we're using Math.random() for IDs
    // In a real app, this would query an actual database
    return getAuthorProfile("Matt Haig");
  };

  if (currentPage === "login") {
    return (
      <>
        <LoginPage
          onBack={() => setCurrentPage("home")}
          onLogin={(userData) => {
            setCurrentUser({ ...userData, avatarUrl: "" });
            setIsUserLoggedIn(true);
            setCurrentPage("dashboard");
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "author") {
    return (
      <>
        <AuthorLoginPage
          onBack={() => setCurrentPage("home")}
          onLogin={() => {
            setIsAuthorLoggedIn(true);
            setCurrentPage("author-dashboard");
          }}
          onRegister={() =>
            setCurrentPage("author-verification")
          }
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "author-verification") {
    return (
      <>
        <AuthorVerificationPage
          onBack={() => setCurrentPage("author")}
          onVerified={() =>
            setCurrentPage("author-registration")
          }
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "author-registration") {
    return (
      <>
        <AuthorRegistrationPage
          onBack={() => setCurrentPage("author-verification")}
          onRegister={() => {
            setIsAuthorLoggedIn(true);
            setCurrentPage("author-dashboard");
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "admin") {
    return (
      <>
        <AdminLoginPage
          onBack={() => setCurrentPage("home")}
          onLogin={() => setCurrentPage("admin-dashboard")}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "dashboard") {
    return (
      <>
        <UserDashboard
          onLogout={() => {
            setIsUserLoggedIn(false);
            setCurrentPage("home");
          }}
          onLogoClick={() => setCurrentPage("home")}
          onViewNotifications={() =>
            setCurrentPage("notifications")
          }
          onViewSubscription={() =>
            setCurrentPage("subscription")
          }
          onViewChat={() => setCurrentPage("chat")}
          onEditProfile={() => setCurrentPage("edit-profile")}
          currentUser={currentUser}
          userLists={userLists}
          setUserLists={setUserLists}
          listIcons={listIcons}
          onViewList={(list) => {
            setSelectedListName(list.name);
            setCurrentPage("list-view");
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "author-dashboard") {
    return (
      <AuthorDashboard
        onLogout={() => {
          setIsAuthorLoggedIn(false);
          setCurrentPage("home");
        }}
        onLogoClick={() => setCurrentPage("home")}
        onViewNotifications={() =>
          setCurrentPage("author-notifications")
        }
        onEditProfile={() =>
          setCurrentPage("author-edit-profile")
        }
        currentAuthor={currentAuthor}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "author-notifications") {
    return (
      <>
        <AuthorNotificationsPage
          onBack={() => setCurrentPage("author-dashboard")}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "author-edit-profile") {
    return (
      <>
        <AuthorEditProfilePage
          onBack={() => setCurrentPage("author-dashboard")}
          onLogoClick={() => setCurrentPage("home")}
          currentAuthor={currentAuthor}
          onSave={(updatedAuthor) => {
            setCurrentAuthor(updatedAuthor);
            setCurrentPage("author-dashboard");
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "admin-dashboard") {
    return (
      <>
        <AdminDashboard
          onLogout={() => setCurrentPage("home")}
          onLogoClick={() => setCurrentPage("home")}
          onViewReports={() => setCurrentPage("admin-reports")}
          onViewAuthorProfile={(authorId) => {
            setSelectedAuthorId(authorId);
            setCurrentPage("author-profile");
          }}
          onViewBookDetails={(bookId) => {
            setSelectedBookId(bookId);
            setPreviousPage("browse");
            setCurrentPage("book-details");
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "admin-reports") {
    return (
      <>
        <AdminReportsPage
          onBack={() => setCurrentPage("admin-dashboard")}
          onLogoClick={() => setCurrentPage("home")}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "browse") {
    return (
      <BrowseBooksPage
        onBack={() => setCurrentPage("home")}
        onBookSelect={(book) => {
          setSelectedBookId(book.id);
          setPreviousPage("browse");
          setCurrentPage("book-details");
        }}
        onAuthorSelect={(authorName) => {
          const authorProfile = getAuthorProfile(authorName);
          setSelectedAuthorId(authorProfile.id);
          setCurrentPage("author-profile");
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "author-profile" && selectedAuthorId) {
    return (
      <AuthorPublicProfilePage
        author={getAuthorProfileById(selectedAuthorId)}
        onBack={() => setCurrentPage("browse")}
        onLogoClick={() => setCurrentPage("home")}
        onBookSelect={(book) => {
          setSelectedBookId(book.id);
          setPreviousPage("browse");
          setCurrentPage("book-details");
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "book-details" && selectedBookId) {
    return (
      <BookDetailsPage
        book={getBookById(selectedBookId)}
        onBack={() => setCurrentPage(previousPage)}
        onLogoClick={() => setCurrentPage("home")}
        userLists={userLists}
        setUserLists={setUserLists}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "notifications") {
    return (
      <NotificationsPage
        onBack={() => setCurrentPage("dashboard")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "subscription") {
    return (
      <SubscriptionPage
        onBack={() => setCurrentPage("dashboard")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "chat") {
    return (
      <ChatPage
        onBack={() => setCurrentPage("dashboard")}
        onLogoClick={() => setCurrentPage("home")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "edit-profile") {
    return (
      <EditProfilePage
        onBack={() => setCurrentPage("dashboard")}
        onLogoClick={() => setCurrentPage("home")}
        currentUser={currentUser}
        onSave={(updatedUser) => {
          setCurrentUser(updatedUser);
          setCurrentPage("dashboard");
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === "list-view" && selectedListName) {
    const allBooks = [...trendingBooks, ...newReleases];

    return (
      <ListViewPage
        list={
          userLists.find(
            (list) => list.name === selectedListName,
          ) || {
            id: 0,
            name: "",
            count: 0,
            bookIds: [],
            icon: Heart,
          }
        }
        allBooks={allBooks}
        onBack={() => setCurrentPage("dashboard")}
        onLogoClick={() => setCurrentPage("home")}
        onBookClick={(book) => {
          setSelectedBookId(book.id);
          setPreviousPage("browse");
          setCurrentPage("book-details");
        }}
        onRemoveFromList={(bookId) => {
          setUserLists(
            userLists.map((list) =>
              list.name === selectedListName
                ? {
                    ...list,
                    bookIds: list.bookIds.filter(
                      (id) => id !== bookId,
                    ),
                    count: list.count - 1,
                  }
                : list,
            ),
          );
          setSelectedListName(selectedListName);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  const features = [
    {
      icon: BookOpen,
      title: "Discover Books",
      description:
        "Explore millions of titles across every genre. Find your next favorite read with personalized recommendations.",
    },
    {
      icon: Star,
      title: "Rate & Review",
      description:
        "Share your thoughts and help others discover great books. Your opinion matters to our community.",
    },
    {
      icon: TrendingUp,
      title: "Follow Trends",
      description:
        "Stay up-to-date with what's popular. See what the community is reading and loving right now.",
    },
    {
      icon: Users,
      title: "Connect with Readers",
      description:
        "Join a passionate community of book lovers. Discuss, share, and grow your reading list together.",
    },
  ];

  const stats = [
    { value: "2.4M+", label: "Books Catalogued" },
    { value: "850K+", label: "Active Readers" },
    { value: "12M+", label: "Reviews Written" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BookMarked className="w-6 h-6 text-primary" />
            <span className="text-xl">BookHub</span>
          </button>

          <div className="hidden md:flex items-center gap-6"></div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setDesktopMenuOpen(!desktopMenuOpen)
                }
                className="p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Desktop Dropdown Menu */}
              {desktopMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setCurrentPage("browse");
                      setDesktopMenuOpen(false);
                    }}
                    className="block w-full text-left py-2.5 px-4 hover:bg-accent/10 hover:text-primary transition-colors"
                  >
                    Browse Books
                  </button>
                  <a
                    href="#trending"
                    onClick={() => setDesktopMenuOpen(false)}
                    className="block w-full text-left py-2.5 px-4 hover:bg-accent/10 hover:text-primary transition-colors"
                  >
                    Trending
                  </a>
                  <a
                    href="#new-releases"
                    onClick={() => setDesktopMenuOpen(false)}
                    className="block w-full text-left py-2.5 px-4 hover:bg-accent/10 hover:text-primary transition-colors"
                  >
                    New Releases
                  </a>
                  <button
                    onClick={() => {
                      setCurrentPage("author");
                      setDesktopMenuOpen(false);
                    }}
                    className="block w-full text-left py-2.5 px-4 hover:bg-accent/10 hover:text-primary transition-colors"
                  >
                    Author Portal
                  </button>
                </div>
              )}
            </div>
            {isUserLoggedIn || isAuthorLoggedIn ? (
              <button
                onClick={() =>
                  setCurrentPage(
                    isUserLoggedIn
                      ? "dashboard"
                      : "author-dashboard",
                  )
                }
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      isUserLoggedIn
                        ? currentUser.avatarUrl
                        : currentAuthor.avatarUrl
                    }
                  />
                  <AvatarFallback className="bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </Button>
            )}
            <Button
              size="sm"
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-background border-2 border-yellow-400"
              onClick={() => setCurrentPage("subscription")}
            >
              <Crown className="w-4 h-4" />
              Premium
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button
                onClick={() => {
                  setCurrentPage("browse");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 rounded hover:bg-accent/10 hover:text-primary transition-colors"
              >
                Browse Books
              </button>
              <a
                href="#trending"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 px-3 rounded hover:bg-accent/10 hover:text-primary transition-colors"
              >
                Trending
              </a>
              <a
                href="#new-releases"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 px-3 rounded hover:bg-accent/10 hover:text-primary transition-colors"
              >
                New Releases
              </a>
              <button
                onClick={() => {
                  setCurrentPage("author");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 rounded hover:bg-accent/10 hover:text-primary transition-colors"
              >
                Author Portal
              </button>
              <div className="pt-3 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentPage("login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full justify-start bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-background border-2 border-yellow-400"
                  onClick={() => {
                    setCurrentPage("subscription");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Enhanced Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-25 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm shadow-lg">
              Join 850K+ Book Lovers
            </Badge>
            <h1 className="text-4xl md:text-6xl mb-6 drop-shadow-sm">
              Your Digital Library <br />
              Where Stories Come Alive
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Discover, rate, and review books in the world's
              most trusted reading community. Connect with
              fellow readers and authors in a space built for
              book lovers.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for books, authors, or genres..."
                  className="pl-12 h-14 bg-card border-border cursor-pointer"
                  onClick={() => setCurrentPage("browse")}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setCurrentPage("browse")}
              >
                Browse Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent/10"
                onClick={() => setCurrentPage("author")}
              >
                For Authors
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-secondary/30 via-accent/20 to-secondary/30 border-y border-border backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl text-primary mb-2 font-semibold">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Books Section */}
      <section id="trending" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl mb-3">
                Trending Now
              </h2>
              <p className="text-muted-foreground">
                The most popular books in our community this
                week
              </p>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-accent/10"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingBooks.map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                author={book.author}
                rating={book.rating}
                reviews={book.totalRatings}
                coverUrl={book.cover}
                genre={book.genre}
                isTrending={true}
                onClick={() => {
                  setSelectedBookId(book.id);
                  setPreviousPage("home");
                  setCurrentPage("book-details");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="discover" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">
              Everything You Need for Your Reading Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              A comprehensive platform designed for readers and
              writers to connect, discover, and grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = [
                "bg-primary/20 hover:bg-primary/30",
                "bg-accent/20 hover:bg-accent/30",
                "bg-secondary/30 hover:bg-secondary/40",
                "bg-primary/15 hover:bg-primary/25",
              ];

              // Map each feature to its navigation destination
              const handleFeatureClick = () => {
                switch (feature.title) {
                  case "Discover Books":
                    setCurrentPage("browse");
                    break;
                  case "Rate & Review":
                    setCurrentPage("browse");
                    break;
                  case "Follow Trends":
                    // Scroll to trending section
                    document
                      .getElementById("trending")
                      ?.scrollIntoView({ behavior: "smooth" });
                    break;
                  case "Connect with Readers":
                    setCurrentPage("login"); // They need to login first to access chat
                    break;
                }
              };

              return (
                <button
                  key={index}
                  onClick={handleFeatureClick}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-xl hover:border-primary/40 transition-all duration-300 text-left cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${colors[index]} flex items-center justify-center mb-4 transition-colors`}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section id="new-releases" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl mb-3">
                New Releases
              </h2>
              <p className="text-muted-foreground">
                Fresh picks from talented authors around the
                world
              </p>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-accent/10"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newReleases.map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                author={book.author}
                rating={book.rating}
                reviews={book.totalRatings}
                coverUrl={book.cover}
                genre={book.genre}
                onClick={() => {
                  setSelectedBookId(book.id);
                  setPreviousPage("home");
                  setCurrentPage("book-details");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(164,135,131,0.2),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-4">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Join thousands of readers and authors in building
              the world's most vibrant book community
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="community"
        className="bg-card border-t border-border py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookMarked className="w-5 h-5 text-primary" />
                <span className="text-lg">BookHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted companion for discovering, rating,
                and reviewing books in a vibrant community of
                readers and writers.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Trending Books
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    New Releases
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Top Rated
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Genres
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    For Readers
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("author")}
                    className="hover:text-primary transition-colors text-left"
                  >
                    For Authors
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Book Clubs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Forums
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 BookHub. All rights reserved.</p>
            <button
              onClick={() => setCurrentPage("admin")}
              className="mt-2 text-xs hover:text-primary transition-colors opacity-50 hover:opacity-100"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}