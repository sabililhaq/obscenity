import { RegExpMatcher } from "../../src/matcher/regexp/RegExpMatcher";
import {
  indonesianDataset,
  indonesianRecommendedTransformers,
} from "../../src/preset/indonesian";

describe("indonesian dataset & preset", () => {
  const indonesianMatcher = new RegExpMatcher({
    ...indonesianDataset.build(),
    ...indonesianRecommendedTransformers,
  });

  it("should match basic Indonesian profane words", () => {
    expect(indonesianMatcher.hasMatch("dasar anjing")).toBe(true);
    expect(indonesianMatcher.hasMatch("pantat")).toBe(true);
    expect(indonesianMatcher.hasMatch("goblok")).toBe(true);
    expect(indonesianMatcher.hasMatch("brengsek")).toBe(true);
    expect(indonesianMatcher.hasMatch("diancok")).toBe(true);
    expect(indonesianMatcher.hasMatch("sundal")).toBe(true);
    expect(indonesianMatcher.hasMatch("koplak")).toBe(true);
  });

  it("should match expanded Indonesian profane words", () => {
    expect(indonesianMatcher.hasMatch("dasar sialan")).toBe(true);
    expect(indonesianMatcher.hasMatch("bedebah")).toBe(true);
    expect(indonesianMatcher.hasMatch("sontoloyo")).toBe(true);
    expect(indonesianMatcher.hasMatch("berengsek")).toBe(true);
    expect(indonesianMatcher.hasMatch("mampus kau")).toBe(true);
    expect(indonesianMatcher.hasMatch("bokep")).toBe(true);
    expect(indonesianMatcher.hasMatch("pelakor")).toBe(true);
    expect(indonesianMatcher.hasMatch("ngaceng")).toBe(true);
    expect(indonesianMatcher.hasMatch("ngocok")).toBe(true);
    expect(indonesianMatcher.hasMatch("geblek")).toBe(true);
    expect(indonesianMatcher.hasMatch("anjay")).toBe(true);
    expect(indonesianMatcher.hasMatch("jangkrik")).toBe(true);
    expect(indonesianMatcher.hasMatch("kunyuk")).toBe(true);
    expect(indonesianMatcher.hasMatch("kehed")).toBe(true);
  });

  it("should match slang variants and regional forms", () => {
    expect(indonesianMatcher.hasMatch("anjink")).toBe(true);
    expect(indonesianMatcher.hasMatch("anying")).toBe(true);
    expect(indonesianMatcher.hasMatch("bokong")).toBe(true);
    expect(indonesianMatcher.hasMatch("burit")).toBe(true);
    expect(indonesianMatcher.hasMatch("begok")).toBe(true);
    expect(indonesianMatcher.hasMatch("dungu")).toBe(true);
    expect(indonesianMatcher.hasMatch("dongok")).toBe(true);
    expect(indonesianMatcher.hasMatch("brengsex")).toBe(true);
    expect(indonesianMatcher.hasMatch("budeg")).toBe(true);
    expect(indonesianMatcher.hasMatch("jembel")).toBe(true);
    expect(indonesianMatcher.hasMatch("jembud")).toBe(true);
    expect(indonesianMatcher.hasMatch("arsundal")).toBe(true);
    expect(indonesianMatcher.hasMatch("sompret")).toBe(true);
    expect(indonesianMatcher.hasMatch("bedegong")).toBe(true);
    expect(indonesianMatcher.hasMatch("ndeso")).toBe(true);
    expect(indonesianMatcher.hasMatch("udik")).toBe(true);
    expect(indonesianMatcher.hasMatch("matamu")).toBe(true);
    expect(indonesianMatcher.hasMatch("matane")).toBe(true);
  });

  it("should match sexual and body-related slang variants", () => {
    expect(indonesianMatcher.hasMatch("kontil")).toBe(true);
    expect(indonesianMatcher.hasMatch("kotl")).toBe(true);
    expect(indonesianMatcher.hasMatch("kentot")).toBe(true);
    expect(indonesianMatcher.hasMatch("kentu")).toBe(true);
    expect(indonesianMatcher.hasMatch("kenthu")).toBe(true);
    expect(indonesianMatcher.hasMatch("jiancux")).toBe(true);
    expect(indonesianMatcher.hasMatch("memex")).toBe(true);
    expect(indonesianMatcher.hasMatch("pler")).toBe(true);
    expect(indonesianMatcher.hasMatch("borjong")).toBe(true);
    expect(indonesianMatcher.hasMatch("tolir")).toBe(true);
    expect(indonesianMatcher.hasMatch("kelentit")).toBe(true);
    expect(indonesianMatcher.hasMatch("tobrut")).toBe(true);
    expect(indonesianMatcher.hasMatch("nenen")).toBe(true);
    expect(indonesianMatcher.hasMatch("nete")).toBe(true);
    expect(indonesianMatcher.hasMatch("dubur")).toBe(true);
    expect(indonesianMatcher.hasMatch("nyoli")).toBe(true);
    expect(indonesianMatcher.hasMatch("ngecrot")).toBe(true);
    expect(indonesianMatcher.hasMatch("ngewek")).toBe(true);
    expect(indonesianMatcher.hasMatch("onani")).toBe(true);
    expect(indonesianMatcher.hasMatch("masturbasi")).toBe(true);
  });

  it("should match insults, religious curses, and multi-word phrases", () => {
    expect(indonesianMatcher.hasMatch("biadab")).toBe(true);
    expect(indonesianMatcher.hasMatch("bejat")).toBe(true);
    expect(indonesianMatcher.hasMatch("sinting")).toBe(true);
    expect(indonesianMatcher.hasMatch("gelo")).toBe(true);
    expect(indonesianMatcher.hasMatch("edan")).toBe(true);
    expect(indonesianMatcher.hasMatch("ngehe")).toBe(true);
    expect(indonesianMatcher.hasMatch("mampos")).toBe(true);
    expect(indonesianMatcher.hasMatch("mampuz")).toBe(true);
    expect(indonesianMatcher.hasMatch("modar")).toBe(true);
    expect(indonesianMatcher.hasMatch("jahanam")).toBe(true);
    expect(indonesianMatcher.hasMatch("laknat")).toBe(true);
    expect(indonesianMatcher.hasMatch("najis")).toBe(true);
    expect(indonesianMatcher.hasMatch("najong")).toBe(true);
    expect(indonesianMatcher.hasMatch("iblis")).toBe(true);
    expect(indonesianMatcher.hasMatch("setan")).toBe(true);
    expect(indonesianMatcher.hasMatch("dajal")).toBe(true);
    expect(indonesianMatcher.hasMatch("persetan")).toBe(true);
    expect(indonesianMatcher.hasMatch("haram jadah")).toBe(true);
    expect(indonesianMatcher.hasMatch("anak haram")).toBe(true);
  });

  it("should match other expanded slang categories", () => {
    expect(indonesianMatcher.hasMatch("bugil")).toBe(true);
    expect(indonesianMatcher.hasMatch("bogel")).toBe(true);
    expect(indonesianMatcher.hasMatch("germo")).toBe(true);
    expect(indonesianMatcher.hasMatch("mucikari")).toBe(true);
    expect(indonesianMatcher.hasMatch("bandot")).toBe(true);
    expect(indonesianMatcher.hasMatch("maho")).toBe(true);
    expect(indonesianMatcher.hasMatch("pecundang")).toBe(true);
    expect(indonesianMatcher.hasMatch("boker")).toBe(true);
    expect(indonesianMatcher.hasMatch("berak")).toBe(true);
    expect(indonesianMatcher.hasMatch("eek")).toBe(true);
    expect(indonesianMatcher.hasMatch("tahi")).toBe(true);
    expect(indonesianMatcher.hasMatch("taek")).toBe(true);
    expect(indonesianMatcher.hasMatch("tae")).toBe(true);
    expect(indonesianMatcher.hasMatch("perkosa")).toBe(true);
    expect(indonesianMatcher.hasMatch("memperkosa")).toBe(true);
    expect(indonesianMatcher.hasMatch("pemerkosa")).toBe(true);
    expect(indonesianMatcher.hasMatch("diperkosa")).toBe(true);
    expect(indonesianMatcher.hasMatch("kimcil")).toBe(true);
    expect(indonesianMatcher.hasMatch("cabean")).toBe(true);
    expect(indonesianMatcher.hasMatch("genjik")).toBe(true);
    expect(indonesianMatcher.hasMatch("genjit")).toBe(true);
    expect(indonesianMatcher.hasMatch("congek")).toBe(true);
    expect(indonesianMatcher.hasMatch("congean")).toBe(true);
    expect(indonesianMatcher.hasMatch("bagong")).toBe(true);
    expect(indonesianMatcher.hasMatch("babangus")).toBe(true);
    expect(indonesianMatcher.hasMatch("bispak")).toBe(true);
    expect(indonesianMatcher.hasMatch("jalang")).toBe(true);
    expect(indonesianMatcher.hasMatch("kimax")).toBe(true);
    expect(indonesianMatcher.hasMatch("kaparat")).toBe(true);
    expect(indonesianMatcher.hasMatch("kopet")).toBe(true);
    expect(indonesianMatcher.hasMatch("kurap")).toBe(true);
    expect(indonesianMatcher.hasMatch("bangkai")).toBe(true);
  });

  it("should match common abbreviations and short forms", () => {
    expect(indonesianMatcher.hasMatch("ajg")).toBe(true);
    expect(indonesianMatcher.hasMatch("anjg")).toBe(true);
    expect(indonesianMatcher.hasMatch("kntl")).toBe(true);
    expect(indonesianMatcher.hasMatch("kntol")).toBe(true);
    expect(indonesianMatcher.hasMatch("gblk")).toBe(true);
    expect(indonesianMatcher.hasMatch("bgst")).toBe(true);
    expect(indonesianMatcher.hasMatch("bgsd")).toBe(true);
    expect(indonesianMatcher.hasMatch("bansat")).toBe(true);
    expect(indonesianMatcher.hasMatch("njir")).toBe(true);
    expect(indonesianMatcher.hasMatch("njrit")).toBe(true);
  });

  it("should match profanity embedded in realistic sentences", () => {
    expect(indonesianMatcher.hasMatch("Dasar bangsat lu!")).toBe(true);
    expect(indonesianMatcher.hasMatch("Jangan main bokep di kantor")).toBe(true);
    expect(indonesianMatcher.hasMatch("Dia bilang aku pecundang")).toBe(true);
    expect(indonesianMatcher.hasMatch("Anak haram itu menyesatkan")).toBe(true);
    expect(indonesianMatcher.hasMatch("Persetan dengan aturannya")).toBe(true);
    expect(indonesianMatcher.hasMatch("Kamu biadab banget sih")).toBe(true);
  });

  it("should handle mixed case and punctuation around matches", () => {
    expect(indonesianMatcher.hasMatch("ANJING")).toBe(true);
    expect(indonesianMatcher.hasMatch("GoBlOk")).toBe(true);
    expect(indonesianMatcher.hasMatch("BaNgSaT")).toBe(true);
    expect(indonesianMatcher.hasMatch("...mampus...")).toBe(true);
    expect(indonesianMatcher.hasMatch("bokep.")).toBe(true);
    expect(indonesianMatcher.hasMatch('"sialan"')).toBe(true);
    expect(indonesianMatcher.hasMatch("x bangsat y")).toBe(true);
  });

  it("should handle Indonesian leetspeak variations", () => {
    expect(indonesianMatcher.hasMatch("4nj1n6")).toBe(true);
    expect(indonesianMatcher.hasMatch("k0nt0l")).toBe(true);
    expect(indonesianMatcher.hasMatch("g0bl0k")).toBe(true);
    expect(indonesianMatcher.hasMatch("b4ngs4t")).toBe(true);
    expect(indonesianMatcher.hasMatch("m3m3k")).toBe(true);
    expect(indonesianMatcher.hasMatch("j4nc0k")).toBe(true);
    expect(indonesianMatcher.hasMatch("t0l0l")).toBe(true);
  });

  it("should handle non-ASCII Indonesian obfuscation", () => {
    expect(indonesianMatcher.hasMatch("𝓪𝓷𝓳𝓲𝓷𝓰")).toBe(true);
    expect(indonesianMatcher.hasMatch("𝔤𝔬𝔟𝔩𝔬𝔨")).toBe(true);
    expect(indonesianMatcher.hasMatch("ⓑⓐⓝⓖⓢⓐⓣ")).toBe(true);
  });

  it("should handle repeated Indonesian letters", () => {
    // Letters with default collapse threshold 1 (e.g. i, t, u, h) reduce cleanly.
    expect(indonesianMatcher.hasMatch("anjiiiing")).toBe(true);
    expect(indonesianMatcher.hasMatch("bangsatt")).toBe(true);
    expect(indonesianMatcher.hasMatch("mampuuus")).toBe(true);
    expect(indonesianMatcher.hasMatch("bedebahhh")).toBe(true);
  });

  it("should respect whitelisted Indonesian phrases", () => {
    expect(indonesianMatcher.hasMatch("babi guling")).toBe(false);
    expect(indonesianMatcher.hasMatch("babi ngepet")).toBe(false);
    expect(indonesianMatcher.hasMatch("pantau")).toBe(false);
    expect(indonesianMatcher.hasMatch("Taiwan")).toBe(false);
    expect(indonesianMatcher.hasMatch("sarapan pagi")).toBe(false);
    expect(indonesianMatcher.hasMatch("asumsi dasar")).toBe(false);
    expect(indonesianMatcher.hasMatch("asuh anak")).toBe(false);
    expect(indonesianMatcher.hasMatch("asuhan keluarga")).toBe(false);
    expect(indonesianMatcher.hasMatch("asuransi kesehatan")).toBe(false);
    expect(indonesianMatcher.hasMatch("mentai sauce")).toBe(false);
    expect(indonesianMatcher.hasMatch("detail produk")).toBe(false);
    expect(indonesianMatcher.hasMatch("antai saja")).toBe(false);
    expect(indonesianMatcher.hasMatch("kesialan hari ini")).toBe(false);
    expect(indonesianMatcher.hasMatch("anjing tanah")).toBe(false);
  });

  it("should not match clean Indonesian text", () => {
    expect(indonesianMatcher.hasMatch("selamat pagi semuanya")).toBe(false);
    expect(indonesianMatcher.hasMatch("saya suka makan nasi goreng")).toBe(false);
    expect(indonesianMatcher.hasMatch("pekerjaan hari ini sudah selesai")).toBe(false);
    expect(indonesianMatcher.hasMatch("terima kasih atas bantuannya")).toBe(false);
    expect(indonesianMatcher.hasMatch("cuaca hari ini cerah sekali")).toBe(false);
  });
});
