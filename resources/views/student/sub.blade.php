@extends('top.app')
@include('top.topnav')
@section('content')
    <main id="main">

        <!-- ======= Blog Section ======= -->
        <section id="blog" class="blog">
            <div class="container" data-aos="fade-up">

                <div class="row gy-4 posts-list">
                    @foreach ($topics as $topic)
                        <div class="col-xl-4 col-md-6">
                            <article>

                                <div class="post-img">
                                    <img src="{{ asset('/storage/content/' . $topic->image) }}"
                                        alt="" class="img-fluid">
                                </div>


                                <h2 class="title">
                                    <a href="{{ route('topic', ['id' => $topic->topic_id]) }}">{{ $topic->title }}</a>
                                </h2>

                                {{-- <div class="d-flex align-items-center">
                                    <div class="post-meta">
                                      <p class="post-author-list">{{  }}</p>
                                    </div>
                                  </div> --}}
                            </article>
                        </div><!-- End post list item -->
                    @endforeach

                </div><!-- End blog posts list -->


            </div>
        </section><!-- End Blog Section -->

    </main><!-- End #main -->
@stop
