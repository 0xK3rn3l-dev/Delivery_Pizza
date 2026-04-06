'use client'

export default function IsLoadingComponent() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-3">
				<div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
				<p className="text-sm text-muted-foreground">Загрузка...</p>
			</div>
		</div>
	)
}
