# Website Content Map

This file contains all the user-facing text content across the website, organized by component. Use this map to edit, localize, or rework the content of your site.

---

## 1. Site Metadata
* **File Location**: [layout.jsx](file:///c:/Users/user/Desktop/Work/supadick/app/layout.jsx#L3-L9)

| Key | Current Content | Purpose |
| :--- | :--- | :--- |
| `title` | `Truus — We make advertising for you` | Browser tab title / SEO Title |
| `description` | `Truus is a creative advertising agency specialising in brand strategy, social media, video production, and activations.` | SEO search snippet description |

---

## 2. Navigation Bar
* **File Location**: [Navbar.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Navbar.jsx)

### Main Nav Bar
* **Work Menu Trigger** (Line 302): `work`

### Left Popout Menu (Work Showcases)
* **File Location**: [Navbar.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Navbar.jsx#L308-L335)

| Element / Key | Current Content |
| :--- | :--- |
| **Item 1: Client Badge** | `douwe egberts` |
| **Item 1: Project Title** | `feestje bouwe? app douwe` |
| **Item 2: Client Badge** | `hema` |
| **Item 2: Project Title** | `skibidi school` |
| **Item 3: Client Badge** | `hema` |
| **Item 3: Project Title** | `hema socials` |
| **All Our Work Button** | `All our work` |

### Right Popout Menu (WhatsApp QR)
* **File Location**: [Navbar.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Navbar.jsx#L359-L362)

| Element / Key | Current Content |
| :--- | :--- |
| **Title** | `whatsapp us` |
| **Description** | `Scan the QR code to chat with us via your smartphone.` |
| **Desktop Link Text** | `Chat via desktop` |

---

## 3. Vimeo Hero Section
* **File Location**: [VimeoHero.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/VimeoHero.jsx)

### Main Headline
* **Words layout** (Lines 193-235): `we make advertising for the new mainstream`

### Controls & Tooltips (Accessibility / ARIA Labels)
* **File Location**: [VimeoHero.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/VimeoHero.jsx#L244-L258)

| Element / Key | Current Content / Label |
| :--- | :--- |
| **Play/Pause Button** | `Pause` / `Play` |
| **Fullscreen Button** | `Fullscreen` / `Exit fullscreen` |

---

## 4. Horizontal Scrolling Words
* **File Location**: [HorizontalWords.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/HorizontalWords.jsx)

### Main Heading
* **Split into letters** (Lines 140-171): `We wanna be where the people are`

### Bottom Paragraph Text
* **Description** (Lines 178-180):
  ```text
  Audiences are more scattered and more reachable
  than ever. We help brands become leaders on the
  channels of the new mainstream.
  ```

---

## 5. Motion Cards Section
* **File Location**: [MotionCards.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/MotionCards.jsx)

### Main Header
* **Title** (Lines 130-133):
  ```text
  an agency built
  for the future.
  ```
* **Subtitle** (Line 135): `from TV to TikTok.`

### Floating Text Stickers
* **Floating Labels** (Lines 221-227):
  * Label 1 (Pink): `girls just wanna have fun!`
  * Label 2 (Orange): `mainstream is not a dirty word`
  * Label 3 (Red): `arrogance = old fashioned`

### Footer Paragraph
* **Description** (Lines 234-239):
  ```text
  To reach the new generation you need to know where
  they are. We are a true 360° agency, working the
  whole spectrum from TikTok content to TVC and from influencer
  collabs to out of home spectaculars.
  ```

---

## 6. Showreel Section
* **File Location**: [Showreel.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Showreel.jsx#L7-L8)

| Element | Current Content |
| :--- | :--- |
| **Title** | `Showreel Section` |
| **Subtitle** | `Will be created soon` |

---

## 7. Service Cards Section
* **File Location**: [ServiceCards.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/ServiceCards.jsx) and [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L47-L78)

### Heading
* **Title** (Line 32): `call us if you need:`

### Cards Content (from `CARDS_DATA`)
* **File Location**: [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L47-L78)

```javascript
export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'camera',
        title: 'brand',
        services: ['Brand Strategy', '360° Creative', 'Art Direction', 'Copywriting', 'Editing', 'Motion Graphics', 'DTP']
    },
    {
        color: 'darkblue',
        sticker: 'phone',
        title: 'social',
        services: ['Social Media Strategy', 'Social Media Creative', 'TikTok/Social Shoots', 'Influencer Campaign', 'Scheduling Support', 'Community Management', 'Social Listening']
    },
    {
        color: 'orange',
        sticker: 'smiley',
        title: 'activations',
        services: ['Activation Strategy', 'Event Planning', 'Art Direction', 'Production']
    },
    {
        color: 'maroon',
        sticker: 'hand',
        title: 'video production',
        services: ['Campaign video', 'Branded content', 'Social content', 'Marketing material']
    },
    {
        color: 'pink',
        sticker: 'heart',
        title: 'with partners',
        services: ['PR/Journalism', '3D / VFX', 'food styling', 'Photography']
    }
];
```

---

## 8. Double Marquee Section
* **File Location**: [DoubleMarquee.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/DoubleMarquee.jsx) and [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L5-L14)

### Left Header
* **Text** (Line 97): `proud to have worked with:`

### Scrolling Brands (Logos)
* **File Location**: [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L5-L14)
* **Brand names**: `oxxio`, `hema`, `kfc`, `swapfiets`, `anwb`, `netflix`, `ace-tate`, `getir`

---

## 9. Footer Section
* **File Location**: [Footer.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Footer.jsx) and [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L28-L44)

### Footer Columns
* **Column 1: Jobs** (Lines 161-162):
  * Badge: `looking for a job?`
  * Heading: `not hiring right now :(`
* **Column 2: Office** (Lines 166-172):
  * Badge: `office`
  * Address:
    ```text
    papaverhof 21
    1032 LX amsterdam
    ```
  * Map Link Text: `Google Maps`
* **Column 3: Contact** (Lines 181-184):
  * Badge: `contact`
  * Email Link Text: `hello@truus.co`
  * WhatsApp Link Text: `send us a whatsapp*`
  * Millennial Disclaimer: `*we're millennials and gen-z: please do not call us.`

### Social Media Icons (Column 3)
* **File Location**: [data.js](file:///c:/Users/user/Desktop/Work/supadick/lib/data.js#L28-L44)

| Label | Href Link |
| :--- | :--- |
| **LinkedIn** | `https://www.linkedin.com/company/truus/` |
| **Instagram** | `https://www.instagram.com/teamtruus/` |
| **TikTok** | `https://www.tiktok.com/@teamtruus` |

### Footer Bottom Credits
* **File Location**: [Footer.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/Footer.jsx#L240-L249)

| Label / Key | Current Content |
| :--- | :--- |
| **Credits Toggle Button** | `credits` |
| **Design Credit Label** | `design by` |
| **Designer Name** | `Jordan` |
| **Code Credit Label** | `code by` |
| **Developer Name** | `Dennis` |

---

## 10. Interactive Cursor Bubble
* **File Location**: [CursorBubble.jsx](file:///c:/Users/user/Desktop/Work/supadick/components/CursorBubble.jsx)

| Trigger Event | Custom Hover Text |
| :--- | :--- |
| **Default** | `click` |
| **Hovering TRUUS logo** | `to home` |
| **Hovering Work / Interactive Elements** | `click` |
