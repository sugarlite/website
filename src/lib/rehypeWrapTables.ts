/**
 * Wrap Markdown/MDX <table> nodes in a scroll region so wide comparison
 * tables don't overflow the blog measure, and mark header cells with scope.
 */
type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function isElement(node: HastNode | undefined, tag: string): boolean {
  return Boolean(node && node.type === 'element' && node.tagName === tag);
}

function enhanceTable(table: HastNode) {
  const thead = table.children?.find((child) => isElement(child, 'thead'));
  for (const row of thead?.children ?? []) {
    if (!isElement(row, 'tr')) continue;
    for (const cell of row.children ?? []) {
      if (!isElement(cell, 'th')) continue;
      cell.properties = cell.properties ?? {};
      if (cell.properties.scope == null) cell.properties.scope = 'col';
    }
  }

  const tbody = table.children?.find((child) => isElement(child, 'tbody'));
  for (const row of tbody?.children ?? []) {
    if (!isElement(row, 'tr')) continue;
    const firstCell = row.children?.find(
      (child) => isElement(child, 'th') || isElement(child, 'td')
    );
    if (!firstCell) continue;
    firstCell.properties = firstCell.properties ?? {};
    if (firstCell.properties.scope == null) firstCell.properties.scope = 'row';
  }
}

function wrapTables(node: HastNode) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isElement(child, 'table')) {
      enhanceTable(child);
      children[i] = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['bp-table-wrap'],
          role: 'region',
          tabIndex: 0,
        },
        children: [child],
      };
      continue;
    }
    wrapTables(child);
  }
}

export function rehypeWrapTables() {
  return (tree: HastNode) => {
    wrapTables(tree);
  };
}
