# Resume & Freelance Links Setup

## Resume File Setup

1. **Add your resume PDF file:**
   - Place your resume PDF file in the root directory of your portfolio
   - Name it exactly: `resume.pdf`
   - The download link is already configured to use this file

2. **Current resume link location:**
   - Contact page: `/contact.html#resume`
   - Homepage: "Download Resume" button links to the contact page resume section

## Fiverr & Upwork Links

Update the following links in `contact.html`:

1. **Fiverr Link (Line ~358):**
   - Current: `https://www.fiverr.com/YOUR_FIVERR_USERNAME`
   - Replace `YOUR_FIVERR_USERNAME` with your actual Fiverr profile username or full profile URL
   - Example: `https://www.fiverr.com/yourusername` or your full profile URL

2. **Upwork Link (Line ~364):**
   - Current: `https://www.upwork.com/freelancers/YOUR_UPWORK_USERNAME`
   - Replace `YOUR_UPWORK_USERNAME` with your actual Upwork profile username or full profile URL
   - Example: `https://www.upwork.com/freelancers/~yourusername` or your full profile URL

## File Structure

```
maveeshah.github.io/
├── resume.pdf          ← Add your resume PDF here
├── contact.html        ← Update Fiverr/Upwork links here
├── index.html          ← Resume button already configured
└── ...
```

## Notes

- The resume download button will automatically download the file as `Ameer_Muavia_Shah_Resume.pdf`
- All links open in new tabs with proper security attributes (`target="_blank" rel="noopener noreferrer"`)
- The resume section is accessible via anchor link: `contact.html#resume`

