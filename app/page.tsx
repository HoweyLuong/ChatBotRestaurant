import ChatWidget from "@/components/ChatWidget"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the RestaurantBot
        </h1>
        <p className="mt-4 text-gray-600">
          Chat with us to book your table right now!
        </p>
      </section>
      <ChatWidget />
    </main>
  )
}