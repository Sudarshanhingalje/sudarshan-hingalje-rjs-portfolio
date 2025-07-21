const Experience = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* EXPERIENCE Title */}
        <div className="mb-16">
          <h1 className="text-8xl font-bold text-gray-300 tracking-wider">
            EXPERIENCE
          </h1>
        </div>

        {/* Experience Entry */}
        <div className="ml-16">
          <div className="flex items-start space-x-8">
            {/* Number */}
            <div className="text-6xl font-bold text-gray-800 leading-none">
              01
            </div>

            {/* Experience Details */}
            <div className="space-y-4 pt-2">
              {/* Company Header */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Mark 2 Associate
                </h3>
              </div>

              {/* Job Details */}
              <div className="text-gray-600 space-y-2 text-sm leading-relaxed">
                <p className="font-medium">UX/UI Intern</p>
                <p>Designed beautiful landing pages for product campaigns</p>
                <p>
                  Collaborated with cross-functional teams, improving knowledge
                  of UX Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
