<script context="module">
	import AsmblyIcon from '$lib/components/asmblyIcon.svelte'
	import { DateTime } from 'luxon';
	const classImages = import.meta.glob('$lib/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		eager: true,
		query: {
			enhanced: true
		}
	});
</script>

<script>
	export let filters = {};
	export let event;

	$: summaryLength = filters.compact ? 100 : 200;

	$: summary = event?.summary ? `${event.summary.substring(0, summaryLength)}${event.summary.length > summaryLength ? '...' : ''}` : 'No summary available'
</script>

{#if event}
<div class="card mx-2 mb-4 rounded-none bg-base-100 shadow-xl lg:card-side lg:max-h-72">
	<figure class="{filters.compact ? ' lg:w-1/3' : 'w-full lg:w-4/5 lg:flex'}">
		<enhanced:img
			class="object-cover h-full {filters.compact ? 'hidden lg:block' : 'lg:w-auto lg-flex-shrink-0 lg:object-center'}"
			src={event.getClassImage(classImages)}
			alt="{event.name} image"
		/>
	</figure>
	<div class="card-body w-full {filters.compact ? 'p-4' : ''}">
		<div class="flex justify-between">
			<h2 class="font-asmbly text-accent card-title font-light">{event.name}</h2>
			<div class="grid h-8 w-8 place-items-center {filters.compact ? 'order-last' : ''}">
				<AsmblyIcon category={event.category} alwaysChecked={true} />
			</div>
		</div>
		<p>{#if filters.groupByClass} Next Class: {/if}
			{#if event.isPast}
				TBD
			{:else}
				<span>{event.startDateTime.toLocaleString('en-US', {dateStyle: "short", timeStyle: "short"})}</span>&nbsp;at
							{event.startDateTime.toLocaleString(DateTime.TIME_SIMPLE)}
			{/if}
		</p>
		<p class="text-md">{summary}</p>
		<div class="card-actions content-center float-right">
			<p class="inline-block">Price: {event.price === 0 ? 'Free' : '$' + event.price + '.00'}</p>
			<a class="btn btn-primary rounded-none" href="/event/{event.typeId}?eventId={event.eventId}" aria-label="learn more about {event.name} class">View Schedule</a>
		</div>
	</div>
</div>
{/if}
