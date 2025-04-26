"use client"

import { useParams } from "next/navigation"
import { useState, useRef, useCallback } from "react"
import { InView } from "react-intersection-observer"
import { Product } from "../lib/types/products"
import { loadmore } from "../lib/utils/load-more"
import { useVirtualizer } from "@tanstack/react-virtual"

export default function LoadMore({
    offset,
    initialItems,
}: {
    offset: number
    initialItems: Product[]
}) {
    const { folder } = useParams<{ folder: string }>()
    const [items, setItems] = useState<Product[]>(initialItems)
    const skipVal = useRef(offset)
    const [hasMore, setHasMore] = useState(true)

    const handleLoadMore = useCallback(async () => {
        if (!hasMore) return

        const { products } = await loadmore(folder, skipVal.current)

        if (products.length === 0) {
            setHasMore(false)
            return
        }

        setItems(prev => [...prev, ...products])
        skipVal.current += products.length
    }, [])

    const scrollRef = useRef<HTMLDivElement>(null)
    const virtualizer = useVirtualizer({
        count: items.length,
        estimateSize: () => 24,
        getScrollElement: () => scrollRef.current,
        gap: 3
    })

    const virtualItems = virtualizer.getVirtualItems()

    return (
        <>
            <div
                ref={scrollRef}
                className=" mt-10 w-[80%] mx-auto h-[80dvh]  overflow-y-auto">

                <div
                    style={{
                        position: 'relative',
                        height: `${virtualizer.getTotalSize()}px`
                    }}>

                    {virtualItems.map((vItem) => {
                        const itm = items[vItem.index];
                        return (
                            <div
                                data-index={vItem.index}
                                key={vItem.key}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${vItem.start}px)`,
                                    justifyContent: "center"
                                }}>
                                {itm.title}
                            </div>
                        )
                    })}

                </div>
                {hasMore && (
                    <InView as='div' onChange={(inView) => inView && handleLoadMore()}>
                        <div className="h-10 text-blue-400 flex justify-center items-center mx-auto">
                            Loading more...
                        </div>
                    </InView>
                )}
            </div>

        </>
    )
}
