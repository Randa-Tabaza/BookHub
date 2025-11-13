import { useState } from "react";
import { ArrowLeft, BookMarked, Star, Users, BookOpen, TrendingUp, Award, MapPin, Link as LinkIcon, Twitter, Instagram, Facebook, Mail, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookCard } from "./BookCard";
import { Book } from "./BrowseBooksPage";
import { ReportDialog } from "./ReportDialog";

export interface Author {
  id: number;
  name: string;
  penName?: string;
  email?: string;
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

interface AuthorPublicProfilePageProps {
  author: Author;
  onBack: () => void;
  onLogoClick?: () => void;
  onBookSelect?: (book: Book) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function AuthorPublicProfilePage({ 
  author, 
  onBack, 
  onLogoClick, 
  onBookSelect,
  theme, 
  onToggleTheme 
}: AuthorPublicProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [booksPerPage] = useState(4);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Carousel navigation
  const nextBooks = () => {
    if (currentBookIndex + booksPerPage < author.books.length) {
      setCurrentBookIndex(currentBookIndex + booksPerPage);
    }
  };

  const prevBooks = () => {
    if (currentBookIndex > 0) {
      setCurrentBookIndex(currentBookIndex - booksPerPage);
    }
  };

  const visibleBooks = author.books.slice(currentBookIndex, currentBookIndex + booksPerPage);
  const canGoNext = currentBookIndex + booksPerPage < author.books.length;
  const canGoPrev = currentBookIndex > 0;

  // Calculate genre distribution
  const genreDistribution = author.books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const topGenres = Object.entries(genreDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button 
              onClick={onLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BookMarked className="w-6 h-6 text-primary" />
              <span className="text-xl">BookHub</span>
            </button>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Author Header Section */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(164,135,131,0.3),transparent_70%)]"></div>
            </div>

            <CardContent className="relative -mt-16 pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-card">
                    <AvatarImage src={author.avatarUrl} />
                    <AvatarFallback className="text-2xl">
                      {author.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {author.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl">{author.name}</h1>
                        {author.verified && (
                          <Badge variant="outline" className="border-primary/40 text-primary">
                            <Award className="w-3 h-3 mr-1" />
                            Verified Author
                          </Badge>
                        )}
                      </div>
                      {author.penName && author.penName !== author.name && (
                        <p className="text-muted-foreground mb-2">Pen Name: {author.penName}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {author.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {author.location}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {author.joinDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={handleFollow}
                        className="min-w-[120px]"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <ReportDialog 
                        reportType="author" 
                        targetName={author.name} 
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <div className="text-2xl mb-1">{author.stats.totalBooks}</div>
                      <div className="text-xs text-muted-foreground">Books</div>
                    </div>
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <div className="text-2xl mb-1 flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        {author.stats.avgRating.toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Rating</div>
                    </div>
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <div className="text-2xl mb-1">{author.stats.totalRatings.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Ratings</div>
                    </div>
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <div className="text-2xl mb-1">{author.stats.totalReads.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Reads</div>
                    </div>
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <div className="text-2xl mb-1">{author.stats.followers.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  {(author.website || author.socialLinks) && (
                    <div className="flex flex-wrap items-center gap-3">
                      {author.website && (
                        <a
                          href={author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Website
                        </a>
                      )}
                      {author.socialLinks?.twitter && (
                        <a
                          href={`https://twitter.com/${author.socialLinks.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          {author.socialLinks.twitter}
                        </a>
                      )}
                      {author.socialLinks?.instagram && (
                        <a
                          href={`https://instagram.com/${author.socialLinks.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          {author.socialLinks.instagram}
                        </a>
                      )}
                      {author.socialLinks?.facebook && (
                        <a
                          href={`https://facebook.com/${author.socialLinks.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {author.bio || "No biography available yet."}
                </p>
              </CardContent>
            </Card>

            {/* Published Books Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Published Books</CardTitle>
                    <CardDescription>
                      {author.stats.totalBooks} {author.stats.totalBooks === 1 ? 'book' : 'books'} published
                    </CardDescription>
                  </div>
                  {author.books.length > booksPerPage && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevBooks}
                        disabled={!canGoPrev}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextBooks}
                        disabled={!canGoNext}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {author.books.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No books published yet</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {visibleBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          title={book.title}
                          author={book.author}
                          rating={book.rating}
                          reviews={book.totalRatings}
                          coverUrl={book.cover}
                          genre={book.genre}
                          onClick={() => onBookSelect?.(book)}
                        />
                      ))}
                    </div>
                    {author.books.length > booksPerPage && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Showing {currentBookIndex + 1}-{Math.min(currentBookIndex + booksPerPage, author.books.length)} of {author.books.length} books
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Top Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle>Reader Reviews</CardTitle>
                <CardDescription>What readers are saying about {author.name}'s work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      reader: "Emma Wilson",
                      rating: 5,
                      book: author.books[0]?.title || "Book Title",
                      comment: "Absolutely captivating storytelling! I couldn't put it down.",
                      date: "2 days ago"
                    },
                    {
                      reader: "Michael Chen",
                      rating: 5,
                      book: author.books[1]?.title || "Book Title",
                      comment: "This author has an incredible talent for character development.",
                      date: "1 week ago"
                    },
                    {
                      reader: "Sarah Martinez",
                      rating: 4,
                      book: author.books[0]?.title || "Book Title",
                      comment: "Great read! The plot twists kept me engaged throughout.",
                      date: "2 weeks ago"
                    }
                  ].map((review, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.reader}`} />
                              <AvatarFallback>
                                {review.reader.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{review.reader}</div>
                              <div className="text-xs text-muted-foreground">on {review.book}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Genres Section */}
            <Card>
              <CardHeader>
                <CardTitle>Genres</CardTitle>
                <CardDescription>Primary writing categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topGenres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                  {topGenres.length === 0 && (
                    <p className="text-sm text-muted-foreground">No genres yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Notable milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {author.verified && (
                    <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                      <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Verified Author</div>
                        <div className="text-xs text-muted-foreground">
                          Identity confirmed by BookHub
                        </div>
                      </div>
                    </div>
                  )}
                  {author.stats.totalReads > 10000 && (
                    <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">10K+ Reads</div>
                        <div className="text-xs text-muted-foreground">
                          Popular author milestone
                        </div>
                      </div>
                    </div>
                  )}
                  {author.stats.avgRating >= 4.5 && (
                    <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Highly Rated</div>
                        <div className="text-xs text-muted-foreground">
                          Average rating above 4.5 stars
                        </div>
                      </div>
                    </div>
                  )}
                  {author.stats.totalBooks >= 3 && (
                    <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Prolific Writer</div>
                        <div className="text-xs text-muted-foreground">
                          Published {author.stats.totalBooks}+ books
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Similar Authors Section */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Authors</CardTitle>
                <CardDescription>You might also like</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Jane Parker", genre: "Mystery", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
                    { name: "David Chen", genre: "Sci-Fi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
                    { name: "Lisa Morgan", genre: "Fantasy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" }
                  ].map((similarAuthor, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-accent/30 rounded-lg cursor-pointer transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={similarAuthor.avatar} />
                        <AvatarFallback>
                          {similarAuthor.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{similarAuthor.name}</div>
                        <div className="text-xs text-muted-foreground">{similarAuthor.genre}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}