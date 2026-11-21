const RESPONSIVE_WIDTHS = [480, 800, 1200, 1600];

/** Build srcSet props only for the local photographs with generated WebP variants. */
export function responsivePhoto(path, nativeWidth, sizes) {
  if (typeof path !== 'string' || !/^\/images\/photo\d+\.jpg$/.test(path)) {
    // prettier-ignore
    return {
    };
  }
  if (!Number.isFinite(nativeWidth) || nativeWidth <= 0) {
    // prettier-ignore
    return {
    };
  }

  const stem = path
    .replace('/images/', '/images/optimized/')
    .replace(/\.jpg$/, '');
  const widths = RESPONSIVE_WIDTHS.filter((width) => width <= nativeWidth);
  if (widths.length === 0) {
    // prettier-ignore
    return {
    };
  }

  return {
    srcSet: widths.map((width) => `${stem}-${width}.webp ${width}w`).join(', '),
    sizes,
  };
}
