<x-mail::message>

{{ $body }}

 <x-mail::button :url="'http://127.0.0.1:3000'">
    Go To Website.
 </x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
