/**
 * "Now" card under the hero. Edit freely.
 * - month: shown as the date stamp (e.g. "2026-10" -> OCT '26)
 * - items: anything starting with "TODO" is hidden on the site; *words* are highlighted
 */
export interface NowContent {
  month: string;
  items: string[];
}

export const now: NowContent = {
  month: '2026-10',
  items: [
    'Preparing for *GSoC 2027*: reading codebases and picking good-first-issues.',
    'Shipped *HeatShift* solo for WeMakeDevs × AWS Bharat Builds.',
    'TODO: one more current item',
  ],
};
