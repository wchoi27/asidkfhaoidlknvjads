import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function App() {
  const modules = [
    { title: "Fall Detector", description: "Analyze sensor data to detect falls." },
    { title: "Quiz", description: "Interactive quiz module." },
    { title: "Visualizer", description: "Explore data with dynamic charts." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Hackathon Dashboard</h1>
      </header>
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full p-3 pl-10 rounded-lg shadow focus:outline-none"
          />
          <Search className="absolute top-3 left-3" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <Card key={m.title} className="hover:shadow-lg transition">
            <CardHeader>
              <h2 className="text-xl font-semibold">{m.title}</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{m.description}</p>
              <Button>Open</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
