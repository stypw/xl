import { Directive, HostBinding, Input } from '@angular/core';
import { XlMedia, XlMediaQuery, xlMediaDefault } from "./define";

function parseExpress(query: XlMediaQuery | undefined): string | null {
  if (!query) return null;
  let express = ["screen"];
  if (query.max) {
    express.push(`(max-width: ${query.max}px)`)
  }
  if (query.min) {
    express.push(`(min-width: ${query.min}px)`)
  }
  if (express.length > 1) {
    return express.join(" and ");
  }
  return null;
}

function makeQueries(opt: XlMedia) {
  let lg = parseExpress(opt.lg);
  let md = parseExpress(opt.md);
  let sm = parseExpress(opt.sm);
  let xs = parseExpress(opt.xs);

  let lgQuery: MediaQueryList | null = null;
  let mdQuery: MediaQueryList | null = null;
  let smQuery: MediaQueryList | null = null;
  let xsQuery: MediaQueryList | null = null;

  if (lg) {
    lgQuery = window.matchMedia(lg);
  }
  if (md) {
    mdQuery = window.matchMedia(md);
  }
  if (sm) {
    smQuery = window.matchMedia(sm);
  }
  if (xs) {
    xsQuery = window.matchMedia(xs);
  }

  if (!lgQuery && !mdQuery && !smQuery && !xsQuery) {
    return null;
  }
  if (!lgQuery) {
    lgQuery = mdQuery || smQuery || xsQuery;
  }
  if (!mdQuery) {
    mdQuery = smQuery || xsQuery || lgQuery;
  }
  if (!smQuery) {
    smQuery = xsQuery || mdQuery || lgQuery;
  }
  if (!xsQuery) {
    xsQuery = smQuery || mdQuery || lgQuery;
  }
  return { lgQuery, mdQuery, smQuery, xsQuery };
}

export function useXlMedia(opt: XlMedia = xlMediaDefault) {
  let queries = makeQueries(opt);
  if (!queries) return;
  let { lgQuery, mdQuery, smQuery, xsQuery } = queries;

  lgQuery?.addEventListener("change", (evt) => { if (evt?.matches) { document.body.classList.add("xl-sk-lg") } else { document.body.classList.remove("xl-sk-lg") }; });
  mdQuery?.addEventListener("change", (evt) => { if (evt?.matches) { document.body.classList.add("xl-sk-md") } else { document.body.classList.remove("xl-sk-md") }; });
  smQuery?.addEventListener("change", (evt) => { if (evt?.matches) { document.body.classList.add("xl-sk-sm") } else { document.body.classList.remove("xl-sk-sm") }; });
  xsQuery?.addEventListener("change", (evt) => { if (evt?.matches) { document.body.classList.add("xl-sk-xs") } else { document.body.classList.remove("xl-sk-xs") }; });

  if (lgQuery?.matches) { document.body.classList.add("xl-sk-lg") } else { document.body.classList.remove("xl-sk-lg") };
  if (mdQuery?.matches) { document.body.classList.add("xl-sk-md") } else { document.body.classList.remove("xl-sk-md") };
  if (smQuery?.matches) { document.body.classList.add("xl-sk-sm") } else { document.body.classList.remove("xl-sk-sm") };
  if (xsQuery?.matches) { document.body.classList.add("xl-sk-xs") } else { document.body.classList.remove("xl-sk-xs") };

  return { lgQuery, mdQuery, smQuery, xsQuery };
}

@Directive({
  selector: '[xlMedia]'
})
export class XlMediaDirective {



  @Input()
  set xlMediaOption(opt: XlMedia) {
    let queries = makeQueries(opt);
    if (!queries) return;
    let { lgQuery, mdQuery, smQuery, xsQuery } = queries;

    this.lgQuery = lgQuery;
    this.mdQuery = mdQuery;
    this.smQuery = smQuery;
    this.xsQuery = xsQuery;

    this.lgQuery?.addEventListener("change", (evt) => this.hasXlSkLg = evt.matches);
    this.mdQuery?.addEventListener("change", (evt) => this.hasXlSkMd = evt.matches);
    this.smQuery?.addEventListener("change", (evt) => this.hasXlSkSm = evt.matches);
    this.xsQuery?.addEventListener("change", (evt) => this.hasXlSkXs = evt.matches);

    this.hasXlSkLg = this.lgQuery?.matches || false;
    this.hasXlSkMd = this.mdQuery?.matches || false;
    this.hasXlSkSm = this.smQuery?.matches || false;
    this.hasXlSkXs = this.xsQuery?.matches || false;
  }

  @HostBinding("class.xl-sk-lg")
  hasXlSkLg = false;
  @HostBinding("class.xl-sk-md")
  hasXlSkMd = false;
  @HostBinding("class.xl-sk-sm")
  hasXlSkSm = false;
  @HostBinding("class.xl-sk-xs")
  hasXlSkXs = false;

  lgQuery: MediaQueryList | null = null;
  mdQuery: MediaQueryList | null = null;
  smQuery: MediaQueryList | null = null;
  xsQuery: MediaQueryList | null = null;

  constructor() {
    console.log("hello world");
    this.xlMediaOption = xlMediaDefault;
  }
}
