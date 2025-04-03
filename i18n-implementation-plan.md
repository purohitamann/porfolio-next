# Implementing French Localization

## Steps

1. Set up localization structure:
   - Create locale files for English and French
   - Add language switcher component
   - Set up language context

2. Extract text content:
   - Move all text content from components to locale files
   - Create translation keys for all text
   - Include metadata translations

3. Implement language switching:
   - Add language selector in navbar
   - Create language context provider
   - Add language persistence

4. Update components:
   - Modify components to use translation keys
   - Add language support to dynamic content
   - Ensure date formats are localized

## File Structure
```
src/
  locales/
    en/
      common.json
      hero.json
      work.json
      projects.json
      blog.json
      hackathons.json
    fr/
      common.json
      hero.json
      work.json
      projects.json
      blog.json
      hackathons.json
  contexts/
    LanguageContext.tsx
  components/
    LanguageSwitcher.tsx
```

## Technical Details
- Use React Context for language state management
- Store language preference in localStorage
- Support dynamic content translation
- Maintain consistent date formats