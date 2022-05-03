export interface Data {
  future_eps: Ep[];
  eps: Ep[];
}

export interface Ep {
  id: number;
  serial_id: number;
  season: string;
  ep: string;
  tg_post_id: number;
  fb_post_id: null;
  title: string;
  airdate: Date;
  rait: null | string;
  weight: string;
  online_c: number;
  subtitle_c: number;
  torrent_c: number;
  updated_at: Date;
  serial: Serial;
  torrent: Torrent[];
}

export interface Serial {
  id: number;
  title: string;
  lang_id: number;
  tvrage_id: number | null;
  tvmaze_id: number;
  mdb_id: number | null;
  tvdb_id: number | null;
  imdb_id: string;
  imdb_rating: string;
  weight: string;
  status_id: number;
  poster_id: number;
  runtime: number | null;
  start: Date;
  end: string;
  airtime: null | string;
  airday: null | string;
  timezone: null | string;
  updated_at: Date;
  poster: Poster;
}

export interface Poster {
  id: number;
  name: string;
  alt: string;
  original: string;
  path: Path;
}

export enum Path {
  Serial = "serial",
}

export interface Torrent {
  id: number;
  title: string;
  source_id: number;
  value: string;
  url: string;
  lang_id: number;
  quality_id: number;
  size: number;
  leech: number;
  seed: number;
  pivot: Pivot;
  lang: Lang;
  quality: Quality;
  source: Source;
}

export interface Lang {
  id: number;
  name: LangName;
  short: Short;
  opensubtitles_short: OpensubtitlesShort;
  weight: string;
}

export enum LangName {
  English = "English",
}

export enum OpensubtitlesShort {
  Eng = "eng",
}

export enum Short {
  En = "EN",
}

export interface Pivot {
  ep_id: number;
  torrent_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Quality {
  id: number;
  quality_group_id: number;
  name: string;
}

export interface Source {
  id: number;
  name: SourceName;
  type_id: number;
  active: number;
  weight: number;
  url: string;
  search: Search;
  search_page: SearchPage;
  search_step: string;
  login: number;
  data: string;
}

export enum SourceName {
  Eztv = "Eztv",
  Tracker1337X = "Tracker1337x",
}

export enum Search {
  HTTP1337XToSearchSearchString1 = "http://1337x.to/search/{searchString}/1/",
  HTTPSEztvAgSearchSearchString = "https://eztv.ag/search/{searchString}",
}

export enum SearchPage {
  HTTP1337XToSearchSearchStringPage = "http://1337x.to/search/{searchString}/{page}/",
  HTTPSEztvAgSearchSearchString = "https://eztv.ag/search/{searchString}",
}
