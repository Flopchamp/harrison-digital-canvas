const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/254769719322"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="white"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.454-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.748-1.833l-.484-.287-5.016 1.191 1.215-4.883-.316-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.161-2.719-1.294-.365-.133-.63-.199-.895.199-.266.398-1.028 1.294-1.26 1.56-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.203-1.976-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.2-.232.266-.398.399-.664.133-.266.066-.498-.033-.697-.1-.199-.895-2.157-1.227-2.953-.323-.775-.65-.67-.895-.682l-.763-.013c-.266 0-.697.1-1.062.498-.365.398-1.394 1.362-1.394 3.32s1.427 3.85 1.626 4.116c.2.266 2.808 4.285 6.803 6.01.951.41 1.693.655 2.272.839.954.304 1.823.261 2.51.158.765-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.465z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </span>
      </div>
    </a>
  );
};

export default WhatsAppFloat;
