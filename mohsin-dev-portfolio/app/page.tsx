import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-black to-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={180}
            height={180}
            className="relative rounded-full mb-8 border-2 border-blue-500/30 object-cover"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Mohsin Baig
        </h1>
        <h2 className="text-xl md:text-2xl text-blue-400 font-medium tracking-wide uppercase mb-8 max-w-xl border-y border-blue-500/20 py-2">
          Unreal Engine Game Developer
        </h2>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Unreal Engine 5", desc: "Blueprints, Gameplay Framework, C++" },
            { name: "Blender", desc: "3D Modeling, Texturing, Hard Surface" },
            { name: "Game Design", desc: "Level Layouts, Mechanics, Prototyping" }
          ].map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/40 p-6 rounded-xl text-center border border-zinc-800/80 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="text-xl font-bold text-gray-200 group-hover:text-blue-400 transition-colors mb-2">{skill.name}</div>
              <div className="text-sm text-gray-500">{skill.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Featured Operations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Project Card 1 */}
          <div className="bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300 group">
            <div className="overflow-hidden h-48 relative">
              <Image 
                src="/images/BP_F18.png" 
                alt="Unreal Engine Project" 
                width={500} 
                height={300} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Unreal Engine FPS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A fast-paced tactical shooter subsystem engineered entirely with modular UE5 Blueprints.</p>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300 group">
            <div className="overflow-hidden h-48 relative">
              <Image 
                src="/images/f18images.png" 
                alt="F-18 Jet Fighter Model" 
                width={500} 
                height={300} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">F-18 Jet Hard Surface Model</h3>
              <p className="text-gray-400 text-sm leading-relaxed">High-poly aerospace vehicle optimized for game engines, modeled and baked seamlessly in Blender.</p>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="bg-zinc-900/30 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300 group">
            <div className="overflow-hidden h-48 relative">
              <Image 
                src="/images/game2.jpg" 
                alt="Level Design" 
                width={500} 
                height={300} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Fantasy Environment</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Immersive level design layout utilizing lumen dynamic lighting configurations inside Unreal Engine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 text-center bg-zinc-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{"LET'S BUILD SOMETHING IMMERSIVE"}</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
            Currently scouting for game development opportunities, freelance pipelines, or technical 3D collaborations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-xl mx-auto text-sm text-left">
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
              <span className="block text-xs text-blue-400 uppercase tracking-widest font-semibold mb-1">Email</span>
              <a href="mailto:mohsinbaigi50@gmail.com" className="text-gray-300 hover:text-white transition-colors break-all font-medium">
                mohsinbaigi50@gmail.com
              </a>
            </div>
            
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
              <span className="block text-xs text-blue-400 uppercase tracking-widest font-semibold mb-1">Phone</span>
              <a href="tel:03097287965" className="text-gray-300 hover:text-white transition-colors font-medium">
                03097287965
              </a>
            </div>
            
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 hover:border-blue-500/30 transition-colors backdrop-blur-sm flex flex-col justify-between">
              <div>
                <span className="block text-xs text-blue-400 uppercase tracking-widest font-semibold mb-1">Location</span>
                <span className="text-gray-300 font-medium">
                  Sahiwal, Punjab, Pakistan
                </span>
              </div>
            </div>
          </div>
          
          <a 
            href="mailto:mohsinbaigi50@gmail.com" 
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 mb-12"
          >
            Initiate Contact
          </a>

          <div className="flex justify-center gap-8 text-sm uppercase tracking-wider font-medium text-gray-500">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ArtStation</a>
          </div>
          
          <p className="text-xs text-zinc-600 mt-16 tracking-widest uppercase">
            © {new Date().getFullYear()} Mohsin Baig. All systems operational.
          </p>
        </div>
      </section>
    </main>
  );
}