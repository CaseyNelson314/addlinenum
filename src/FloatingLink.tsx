function FloatingLink({ icon, url }: { icon: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-4 left-4"
    >
      <div className="w-10 h-10 rounded-full p-2">
        <img className="opacity-50" src={icon} alt="a" />
      </div>
    </a>
  );
}

export default FloatingLink;
