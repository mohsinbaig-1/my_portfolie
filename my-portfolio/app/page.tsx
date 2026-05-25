import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* STEP 5: Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-black">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={200}
          height={200}
          className="rounded-full mb-6 border-4 border-blue-500/50"
        />
        <h1 className="text-6xl font-bold mb-4">
          Mohsin Baig
        </h1>
        <h2 className="text-2xl text-blue-400 mb-6">
          Unreal Engine Game Developer
        </h2>
      </section>

      {/* STEP 6: Skills Section */}
      <section className="py-20 px-10 bg-gray-900/50">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-xl text-center font-semibold border border-gray-800">
            Unreal Engine 5
          </div>
          <div className="bg-gray-900 p-6 rounded-xl text-center font-semibold border border-gray-800">
            Blender
          </div>
          <div className="bg-gray-900 p-6 rounded-xl text-center font-semibold border border-gray-800">
            Game Design
          </div>
        </div>
      </section>

      {/* STEP 7: Projects Section */}
      <section className="py-20 px-10 bg-black">
        <h2 className="text-4xl font-bold mb-10 text-center">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Project Card 1 */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 evaluation-card">
            <Image 
              src="/images/BP_F18.png" 
              alt="Unreal Engine Project" 
              width={500} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Unreal Engine FPS</h3>
              <p className="text-gray-400">A fast-paced shooter built using UE5 Blueprints.</p>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 evaluation-card">
            <Image 
              src="/images/f18images.png" 
              alt="Blender 3D Model" 
              width={500} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Sci-Fi Character</h3>
              <p className="text-gray-400">High-poly character modeled and textured in Blender.</p>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 evaluation-card">
            <Image 
              src="/images/game2.jpg" 
              alt="Level Design" 
              width={500} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Fantasy Environment</h3>
              <p className="text-gray-400">Custom level design and lighting setup in Unreal Engine.</p>
            </div>
          </div>

        </div>
      </section>
      {/* STEP 8: Contact Section */}
      <section className="py-20 px-10 bg-gray-950 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-gray-400 mb-8">
            I'm always open to talking about game development opportunities, freelance work, or 3D collaboration.
          </p>
          
          <a 
            href="mailto:your.email@example.com" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors mb-12"
          >
            Get In Touch
          </a>

          <div className="flex justify-center gap-6 text-gray-500">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              ArtStation
            </a>
          </div>
          
          <p className="text-sm text-gray-600 mt-12">
            © {new Date().getFullYear()} Mohsin Baig. All rights reserved.
          </p>
        </div>
      </section>

    </main>
  );
}