// eslint-disable-next-line react/prop-types
export default function Button({ children, cssClass, ...props }) {
  return (
    <button
      {...props}
      className={` font-sans text-lg text-zinc-50 border-solid mx-4 my-5  px-8 rounded-md border-violet-900 border-2 hover:bg-violet-900 duration-300 ${cssClass} `}
    >
      {children}
    </button>
  );
}
