# How to Add Your Profile Image

## Quick Setup

Your portfolio code is now configured to use your professional headshot. Here's how to add it:

### Option 1: Save Image File Directly (Easiest)

1. **Locate your image attachment** - You have a professional headshot that was provided
2. **Save it as `profile.jpg`** in your portfolio folder:
   - Path: `c:\Users\venka\OneDrive\Desktop\portfolio\profile.jpg`
3. **That's it!** The website will automatically use your image

### Option 2: If Your Image Has a Different Name

If your image is named something else (like `pyaram.jpg`, `headshot.png`, etc.):

1. Edit both `index.html` and `about.html`
2. Find these lines:
   ```html
   <img src="profile.jpg" alt="Pyaram Venkatesh" class="profile-image">
   <img src="profile.jpg" alt="Pyaram Venkatesh" class="hero-image">
   ```
3. Replace `profile.jpg` with your actual filename (e.g., `headshot.png`)
4. Save the files

### Image Requirements

✅ **Format**: JPG, PNG, or WebP
✅ **Size**: 400x400px or larger (will be cropped to square)
✅ **File Size**: Under 1MB for best performance
✅ **Location**: Same folder as the HTML files (`portfolio` folder)

## Where the Image Appears

Your profile image now appears in two places:

1. **Home Page (Hero Section)** - Large image at top right
2. **About Page** - Image on the left side with parallax effect

## Image Styling

The images have:
- Professional border radius (16px rounded corners)
- Shadow effects for depth
- Hover animations (lifts up on mouse over)
- Responsive sizing (adapts to mobile)
- Professional cyan border accent

## Next Steps

1. Save your image as `profile.jpg` in the portfolio folder
2. Open `index.html` in your browser
3. Your professional headshot should now be displayed!

If you need any adjustments to the styling, let me know!
