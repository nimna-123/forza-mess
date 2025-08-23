# Tailwind CSS Reference Guide

## Layout & Spacing

### Flexbox
```jsx
// Container
<div className="flex">                    // display: flex
<div className="flex-col">                // flex-direction: column
<div className="flex-row">                // flex-direction: row
<div className="flex-wrap">               // flex-wrap: wrap
<div className="flex-nowrap">             // flex-wrap: nowrap

// Alignment
<div className="items-center">            // align-items: center
<div className="items-start">             // align-items: flex-start
<div className="items-end">               // align-items: flex-end
<div className="justify-center">          // justify-content: center
<div className="justify-between">         // justify-content: space-between
<div className="justify-around">          // justify-content: space-around
<div className="justify-evenly">          // justify-content: space-evenly

// Flex properties
<div className="flex-1">                  // flex: 1 1 0%
<div className="flex-auto">               // flex: 1 1 auto
<div className="flex-none">               // flex: none
<div className="flex-initial">            // flex: 0 1 auto
```

### Grid
```jsx
// Container
<div className="grid">                    // display: grid
<div className="grid-cols-1">             // grid-template-columns: repeat(1, minmax(0, 1fr))
<div className="grid-cols-2">             // grid-template-columns: repeat(2, minmax(0, 1fr))
<div className="grid-cols-3">             // grid-template-columns: repeat(3, minmax(0, 1fr))
<div className="grid-cols-4">             // grid-template-columns: repeat(4, minmax(0, 1fr))

// Responsive grid
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// 1 column on mobile, 2 on medium screens, 3 on large screens

// Gap
<div className="gap-4">                   // gap: 1rem
<div className="gap-x-4">                 // column-gap: 1rem
<div className="gap-y-4">                 // row-gap: 1rem
```

### Spacing
```jsx
// Margin
<div className="m-4">                     // margin: 1rem
<div className="mx-4">                    // margin-left: 1rem; margin-right: 1rem
<div className="my-4">                    // margin-top: 1rem; margin-bottom: 1rem
<div className="mt-4">                    // margin-top: 1rem
<div className="mb-4">                    // margin-bottom: 1rem
<div className="ml-4">                    // margin-left: 1rem
<div className="mr-4">                    // margin-right: 1rem

// Padding
<div className="p-4">                     // padding: 1rem
<div className="px-4">                    // padding-left: 1rem; padding-right: 1rem
<div className="py-4">                    // padding-top: 1rem; padding-bottom: 1rem
<div className="pt-4">                    // padding-top: 1rem
<div className="pb-4">                    // padding-bottom: 1rem
<div className="pl-4">                    // padding-left: 1rem
<div className="pr-4">                    // padding-right: 1rem

// Spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
```

## Typography

### Font Size
```jsx
<p className="text-xs">                   // font-size: 0.75rem
<p className="text-sm">                   // font-size: 0.875rem
<p className="text-base">                 // font-size: 1rem
<p className="text-lg">                   // font-size: 1.125rem
<p className="text-xl">                   // font-size: 1.25rem
<p className="text-2xl">                  // font-size: 1.5rem
<p className="text-3xl">                  // font-size: 1.875rem
<p className="text-4xl">                  // font-size: 2.25rem
```

### Font Weight
```jsx
<p className="font-thin">                 // font-weight: 100
<p className="font-light">                // font-weight: 300
<p className="font-normal">               // font-weight: 400
<p className="font-medium">               // font-weight: 500
<p className="font-semibold">             // font-weight: 600
<p className="font-bold">                 // font-weight: 700
<p className="font-extrabold">            // font-weight: 800
<p className="font-black">                // font-weight: 900
```

### Text Alignment & Decoration
```jsx
<p className="text-left">                 // text-align: left
<p className="text-center">               // text-align: center
<p className="text-right">                // text-align: right
<p className="text-justify">              // text-align: justify

<p className="underline">                 // text-decoration: underline
<p className="line-through">              // text-decoration: line-through
<p className="no-underline">              // text-decoration: none

<p className="uppercase">                 // text-transform: uppercase
<p className="lowercase">                 // text-transform: lowercase
<p className="capitalize">                // text-transform: capitalize
```

### Line Height
```jsx
<p className="leading-none">              // line-height: 1
<p className="leading-tight">             // line-height: 1.25
<p className="leading-snug">              // line-height: 1.375
<p className="leading-normal">            // line-height: 1.5
<p className="leading-relaxed">           // line-height: 1.625
<p className="leading-loose">             // line-height: 2
```

## Colors

### Text Colors
```jsx
<p className="text-black">                // color: #000000
<p className="text-white">                // color: #ffffff
<p className="text-gray-500">             // color: #6b7280
<p className="text-red-500">              // color: #ef4444
<p className="text-blue-500">             // color: #3b82f6
<p className="text-green-500">            // color: #10b981
<p className="text-yellow-500">           // color: #eab308
<p className="text-purple-500">           // color: #8b5cf6
<p className="text-pink-500">             // color: #ec4899
<p className="text-indigo-500">           // color: #6366f1
```

### Background Colors
```jsx
<div className="bg-black">                // background-color: #000000
<div className="bg-white">                // background-color: #ffffff
<div className="bg-gray-500">             // background-color: #6b7280
<div className="bg-red-500">              // background-color: #ef4444
<div className="bg-blue-500">             // background-color: #3b82f6
<div className="bg-green-500">            // background-color: #10b981
<div className="bg-yellow-500">           // background-color: #eab308
<div className="bg-purple-500">           // background-color: #8b5cf6
<div className="bg-pink-500">             // background-color: #ec4899
<div className="bg-indigo-500">           // background-color: #6366f1
```

### Color Shades (50-900)
```jsx
// Gray scale example
<div className="bg-gray-50">              // Very light gray
<div className="bg-gray-100">             // Light gray
<div className="bg-gray-200">             // Lighter gray
<div className="bg-gray-300">             // Light gray
<div className="bg-gray-400">             // Gray
<div className="bg-gray-500">             // Medium gray
<div className="bg-gray-600">             // Dark gray
<div className="bg-gray-700">             // Darker gray
<div className="bg-gray-800">             // Very dark gray
<div className="bg-gray-900">             // Almost black
```

## Borders & Shadows

### Borders
```jsx
<div className="border">                  // border: 1px solid
<div className="border-2">                // border-width: 2px
<div className="border-4">                // border-width: 4px
<div className="border-0">                // border-width: 0px

<div className="border-gray-300">         // border-color: #d1d5db
<div className="border-red-500">          // border-color: #ef4444
<div className="border-blue-500">         // border-color: #3b82f6

<div className="border-solid">            // border-style: solid
<div className="border-dashed">           // border-style: dashed
<div className="border-dotted">           // border-style: dotted

<div className="rounded">                 // border-radius: 0.25rem
<div className="rounded-lg">              // border-radius: 0.5rem
<div className="rounded-xl">              // border-radius: 0.75rem
<div className="rounded-2xl">             // border-radius: 1rem
<div className="rounded-full">            // border-radius: 9999px
```

### Shadows
```jsx
<div className="shadow-sm">               // box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
<div className="shadow">                  // box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
<div className="shadow-md">               // box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)
<div className="shadow-lg">               // box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)
<div className="shadow-xl">               // box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)
<div className="shadow-2xl">              // box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)
<div className="shadow-none">             // box-shadow: none
```

## Sizing

### Width & Height
```jsx
<div className="w-full">                  // width: 100%
<div className="w-screen">                // width: 100vw
<div className="w-auto">                  // width: auto
<div className="w-1/2">                   // width: 50%
<div className="w-1/3">                   // width: 33.333333%
<div className="w-2/3">                   // width: 66.666667%
<div className="w-1/4">                   // width: 25%
<div className="w-3/4">                   // width: 75%

<div className="h-full">                  // height: 100%
<div className="h-screen">                // height: 100vh
<div className="h-auto">                  // height: auto
<div className="h-16">                    // height: 4rem
<div className="h-32">                    // height: 8rem
<div className="h-64">                    // height: 16rem

// Fixed sizes
<div className="w-4 h-4">                 // width: 1rem; height: 1rem
<div className="w-8 h-8">                 // width: 2rem; height: 2rem
<div className="w-12 h-12">               // width: 3rem; height: 3rem
<div className="w-16 h-16">               // width: 4rem; height: 4rem
```

## Responsive Design

### Breakpoints
```jsx
// Default (mobile first)
<div className="w-full">                  // All screen sizes

// Small screens (sm: 640px+)
<div className="w-full sm:w-1/2">         // Full width on mobile, half on small+

// Medium screens (md: 768px+)
<div className="w-full md:w-1/3">         // Full width on mobile, third on medium+

// Large screens (lg: 1024px+)
<div className="w-full lg:w-1/4">         // Full width on mobile, quarter on large+

// Extra large screens (xl: 1280px+)
<div className="w-full xl:w-1/5">         // Full width on mobile, fifth on xl+

// 2XL screens (2xl: 1536px+)
<div className="w-full 2xl:w-1/6">        // Full width on mobile, sixth on 2xl+
```

## Transitions & Animations

### Transitions
```jsx
<div className="transition-all">          // transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)
<div className="transition-colors">       // transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1)
<div className="transition-transform">    // transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1)
<div className="transition-opacity">      // transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)

<div className="duration-150">            // transition-duration: 150ms
<div className="duration-300">            // transition-duration: 300ms
<div className="duration-500">            // transition-duration: 500ms
<div className="duration-700">            // transition-duration: 700ms

<div className="ease-in">                 // transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
<div className="ease-out">                // transition-timing-function: cubic-bezier(0, 0, 0.2, 1)
<div className="ease-in-out">             // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
```

### Hover, Focus, Active States
```jsx
<button className="bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:bg-blue-800">
  // Normal: blue-500, Hover: blue-700, Focus: ring, Active: blue-800
</button>

<div className="opacity-50 hover:opacity-100">
  // Normal: 50% opacity, Hover: 100% opacity
</div>

<div className="scale-100 hover:scale-110">
  // Normal: 100% scale, Hover: 110% scale
</div>
```

## Common Patterns

### Card Component
```jsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Card Title</h3>
  <p className="text-gray-600">Card content goes here.</p>
</div>
```

### Button Variants
```jsx
// Primary Button
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200">
  Primary
</button>

// Secondary Button
<button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition-colors duration-200">
  Secondary
</button>

// Outline Button
<button className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-red-300 transition-all duration-200">
  Outline
</button>
```

### Form Input
```jsx
<div className="relative">
  <input
    type="text"
    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
    placeholder="Enter text..."
  />
  <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-blue-500">
    Label
  </label>
</div>
```

### Navigation Bar
```jsx
<nav className="bg-white shadow-md px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="text-xl font-bold text-gray-800">Logo</div>
    <div className="flex space-x-6">
      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Home</a>
      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">About</a>
      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Contact</a>
    </div>
  </div>
</nav>
```

## Tips for Using Tailwind

1. **Mobile First**: Always start with mobile styles, then add responsive prefixes
2. **Component Consistency**: Use consistent spacing and color scales
3. **Custom Values**: Use square brackets for custom values: `w-[320px]`, `text-[#ff0000]`
4. **Group Related Classes**: Keep related utility classes together
5. **Extract Components**: For repeated patterns, create React components
6. **Use IntelliSense**: Install Tailwind CSS IntelliSense extension for better autocomplete

## Useful Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind CSS Components](https://tailwindui.com/)
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
