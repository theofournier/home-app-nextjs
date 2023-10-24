type Props = {
  title: string;
};

export const MovieSectionTitle = ({ title }: Props) => {
  return (
    <div className="flex">
      <div className="rounded-full px-14 py-2 bg-background/50 backdrop-blur-md backdrop-saturate-150 text-center">
        <span className="text-xl font-semibold">{title}</span>
      </div>
    </div>
  );
};
