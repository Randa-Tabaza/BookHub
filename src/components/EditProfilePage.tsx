import { useState, useRef } from "react";
import { ArrowLeft, BookMarked, User, Mail, Camera, Save, Check, Upload, ImagePlus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface EditProfilePageProps {
  onBack: () => void;
  onLogoClick?: () => void;
  currentUser: {
    username: string;
    email: string;
    avatarUrl?: string;
  };
  onSave: (updatedUser: { username: string; email: string; avatarUrl?: string }) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function EditProfilePage({ onBack, onLogoClick, currentUser, onSave, theme, onToggleTheme }: EditProfilePageProps) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Predefined avatar options
  const avatarOptions = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave({ username, email, avatarUrl });
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate password change
      setSuccessMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleAvatarSelect = (url: string) => {
    setSelectedAvatar(url);
  };

  const handleAvatarSave = () => {
    setAvatarUrl(selectedAvatar);
    setShowAvatarDialog(false);
    setSuccessMessage("Avatar updated! Don't forget to save your profile.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl("");
    setSelectedAvatar("");
    setUploadedImage(null);
    setShowAvatarDialog(false);
    setSuccessMessage("Avatar removed! Don't forget to save your profile.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a valid image file (JPG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setUploadError("Image size must be less than 2MB");
      return;
    }

    setUploadError("");

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUploadedImage(base64String);
      setSelectedAvatar(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleOpenAvatarDialog = () => {
    setShowAvatarDialog(true);
    setUploadError("");
    // If there's a current avatar, set it as selected
    if (avatarUrl) {
      setSelectedAvatar(avatarUrl);
      // Check if it's an uploaded image (base64)
      if (avatarUrl.startsWith("data:")) {
        setUploadedImage(avatarUrl);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <button 
              onClick={onLogoClick || onBack}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BookMarked className="w-6 h-6 text-primary" />
              <span className="text-xl">BookHub</span>
            </button>
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400">
            {successMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={username} />
                    ) : null}
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={handleOpenAvatarDialog}
                    >
                      <Camera className="w-4 h-4" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload your own or choose from our selection
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <Button type="submit" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {errors.currentPassword && (
                    <p className="text-sm text-destructive">{errors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-destructive">{errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" variant="outline">
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Delete Account</p>
                  <p className="text-xs text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Avatar Selection Dialog */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Your Avatar</DialogTitle>
            <DialogDescription>
              Upload your own image or select from our collection
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="gallery">Choose from Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {/* Upload area */}
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <div className="flex flex-col items-center gap-3">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <Avatar className="w-32 h-32 border-4 border-primary">
                        <AvatarImage src={uploadedImage} alt="Uploaded preview" />
                        <AvatarFallback>Preview</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        Click to upload a different image
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, GIF or WebP (max 2MB)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {uploadError && (
                <p className="text-sm text-destructive text-center">{uploadError}</p>
              )}
              
              {uploadedImage && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUploadedImage(null);
                    setSelectedAvatar("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="w-full"
                >
                  Clear Upload
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="gallery" className="py-4">
              <div className="grid grid-cols-4 gap-4">
                {avatarOptions.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleAvatarSelect(url);
                      setUploadedImage(null);
                    }}
                    className={`relative rounded-full overflow-hidden aspect-square border-4 transition-all hover:scale-105 ${
                      selectedAvatar === url && !uploadedImage
                        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Avatar option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedAvatar === url && !uploadedImage && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveAvatar}
            >
              Remove Avatar
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowAvatarDialog(false);
                  setUploadError("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAvatarSave}
                disabled={!selectedAvatar && !uploadedImage}
              >
                Save Avatar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
