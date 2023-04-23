import styles from "@/styles/style.module.scss";
import SearchIcon from "@/public/icon/MagnifyingGlass.svg";

function TotalAlbum() {
  return (
    <section
      className={`${styles.total_album} absolute bg-white dark:bg-dark-block`}
    >
      <div className="flex justify-between w-full p-4">
        <span className="text-xl font-bold">전체 앨범</span>
        <SearchIcon stroke="black" />
      </div>
    </section>
  );
}

export default TotalAlbum;
