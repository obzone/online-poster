import NavigationHeader from "@/components/navigation-header/navigation-header"

export default function ActivityLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavigationHeader displayBackButton={true} month={new Date()} />
      {children}
    </div>
  )
}