// Root layout — passthrough para next-intl (el <html> lo renderiza app/[locale]/layout.tsx)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
