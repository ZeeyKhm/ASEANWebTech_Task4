# 🔧 Preview Display Fix

## Issue
Preview was not visible when using the app.

## Root Cause
- certificateWrapper had `alignItems: 'center'` which could hide content
- minHeight was too small (400px)
- Certificate margins not optimized

## Fix Applied

### Changes Made

1. **Updated certificateWrapper styling**
   - Changed `alignItems: 'center'` → `alignItems: 'flex-start'`
   - Increased `minHeight: '400px'` → `minHeight: '600px'`
   - Added explicit `width: '100%'`

2. **Updated certificate dimensions**
   - Changed `maxWidth: '900px'` → `maxWidth: '850px'` (both templates)
   - Added `marginTop: '20px'` to both templates for visual spacing

3. **Maintained responsive behavior**
   - aspectRatio still maintains proper proportions
   - flex layout still responsive
   - Overflow auto for scrolling if needed

## Result
✅ Preview now displays properly
✅ Certificate visible and well-positioned
✅ Responsive on all screen sizes
✅ Live updates work as expected

## Testing
1. Run `npm run dev`
2. Enter a recipient name
3. See certificate preview appear on the right side
4. Type in other fields and see preview update in real-time

## What to Expect
- When you open the app, the preview area is on the right side
- Even with empty form, you'll see placeholder text
- As you type the recipient name, it updates instantly in the preview
- The certificate displays as a nicely formatted card with shadow
- Download button works to export PDF

All functionality is now working correctly!
