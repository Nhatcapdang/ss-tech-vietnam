Analyze and optimize the selected component:

- Identify unnecessary re-renders
- Add React.memo where beneficial
- Wrap functions with useCallback
- Wrap expensive computations with useMemo
- Check for prop drilling and suggest context/zustand
- Suggest code splitting with dynamic imports
- Ensure Framer Motion animations use layout animations if have used framer motion
- Optimize Tailwind classes (remove duplicates, use utilities)
- Using @mantine/hooks if needed (https://mantine.dev/hooks/package/)