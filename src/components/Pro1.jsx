import { ExternalLink } from "lucide-react";

const Projects = () => {
  return (
    <div className=" min-h-screen p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* PROJECTS Title - Rotated */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <h1 className="text-8xl font-bold text-gray-300 tracking-wider -rotate-90 whitespace-nowrap">
            PROJECTS
          </h1>
        </div>

        {/* Content Area */}
        <div className="ml-32 pt-16">
          {/* Main Project Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mb-8">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop"
                alt="Project 1"
                className="rounded-lg w-full h-20 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=100&fit=crop"
                alt="Project 2"
                className="rounded-lg w-full h-20 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop"
                alt="Project 3"
                className="rounded-lg w-full h-20 object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=100&fit=crop"
                alt="Project 4"
                className="rounded-lg w-full h-20 object-cover col-span-2"
              />
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop"
                alt="Project 5"
                className="rounded-lg w-full h-20 object-cover"
              />
            </div>

            {/* Project Title and Link */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Travelling Owl- Full Stack Website
                </h3>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* HR Club Newsletter Card */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 max-w-xs text-white">
            <p className="text-sm mb-2 opacity-90">HR Club Newsletter</p>
            <h3 className="font-bold text-lg">Cards</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
