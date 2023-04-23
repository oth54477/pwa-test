import { Inter } from "next/font/google";
import NavBar from "@/components/Nav";
import ItemBlock from "@/components/ItemBlock";
import { currentAlbums, favoriteAlbums } from "./api/dummyapi";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
import HeartIcon from "@/public/icon/Heart.svg";
import DotsIcon from "@/public/icon/DotsThreeOutline.svg";
import RightIcon from "@/public/icon/CaretRight.svg";
import styles from "@/styles/style.module.scss";
import TabBar from "@/components/TabBar";
import TotalAlbum from "@/components/TotalAlbum";

interface CurrentAlbumType {
  id: number;
  img: string;
  name: string;
  count: number;
}

interface FavoriteAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-bg-home dark:bg-dark-bg-home relative">
      <NavBar />
      <section className="flex flex-col items-center gap-y-3">
        <CurrentUpload />
        <FavoriteAlbum />
      </section>
      <TotalAlbum />
      <TabBar />
    </div>
  );
}

// 최근 업로드
function CurrentUpload() {
  const currents: React.ReactNode = currentAlbums ? (
    currentAlbums.data.map((currentAlbum: CurrentAlbumType) => (
      <div key={currentAlbum.id}>
        <div
          className="w-12 h-12 rounded-xl bg-center bg-cover"
          style={{ backgroundImage: "url(" + currentAlbum.img + ")" }}
        >
          <div
            className={`w-5 h-5 rounded-full flex justify-center items-center relative ${styles.count_circle}`}
            style={{ top: "-5px", left: "35px" }}
          >
            <span className="text-white" style={{ fontSize: "6px" }}>
              {currentAlbum.count <= 10 ? currentAlbum.count : "10+"}
            </span>
          </div>
        </div>
        <p className="text-xs">{currentAlbum.name}</p>
      </div>
    ))
  ) : (
    <p>아직 추가된 사진이 없어요</p>
  );
  return (
    <ItemBlock width="360px" height="112px" radius="16px">
      <div className="flex flex-col justify-around w-full h-full mx-4">
        <h1 className="text-xl font-bold">최근 업로드</h1>
        <div className="flex gap-4">{currents}</div>
      </div>
    </ItemBlock>
  );
}

// 즐겨찾는 앨범
function FavoriteAlbum() {
  const favorites: React.ReactNode = favoriteAlbums.data
    ? favoriteAlbums.data.map((favoriteAlbum: FavoriteAlbumType) => (
        <div key={favoriteAlbum.id} className={styles.card}>
          <div
            className="w-72 h-96 rounded-xl bg-center bg-cover "
            style={{ backgroundImage: "url(" + favoriteAlbum.img + ")" }}
          >
            <div className="flex justify-end relative top-4 right-4 gap-2">
              <HeartIcon
                fill={favoriteAlbum.isLike ? "red" : "none"}
                stroke={favoriteAlbum.isLike ? "red" : "white"}
              />
              <DotsIcon fill="white" stroke="white" />
            </div>
            <div className="flex flex-col w-32 relative top-6 left-4">
              <span className="text-3xl text-white text-end">
                {favoriteAlbum.name}
              </span>
              <span className="text-white text-end" style={{ fontSize: "8px" }}>
                {favoriteAlbum.createdTime}
              </span>
            </div>
          </div>
        </div>
      ))
    : [...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-72 h-96 rounded-xl grow"
          style={{ backgroundColor: "#94a3b8" }}
        >
          <div>
            <span>앨범 생성하러 가기</span>
          </div>
        </div>
      ));
  return (
    <ItemBlock width="360px" height="" radius="20px">
      <div className="flex flex-col gap-4 w-full h-full py-6">
        <div className="flex justify-between mx-4">
          <h1 className="text-xl font-bold">즐겨찾는 앨범</h1>
          <RightIcon stroke="#B1B8C0" width="20" height="20" />
        </div>
        <div
          className={`flex justify-start gap-4 overflow-scroll ${styles.cards}`}
        >
          {favorites}
        </div>
      </div>
    </ItemBlock>
  );
}
