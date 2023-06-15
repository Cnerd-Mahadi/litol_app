@extends('top.app')
@include('top.topnav')
@section('content')
    <main id="main">

        <!-- ======= Blog Section ======= -->
        <section id="blog" class="blog">
            <div class="container" data-aos="fade-up">

                <div class="row gy-4 posts-list">
                    @foreach ($subjects as $subject)
                        <div class="col-xl-4 col-md-6">
                            <article>

                                <div class="post-img">
                                    <img src="{{ asset('/storage/subject/' . $subject->subject_name) . '.jpg' }}"
                                        alt="" class="img-fluid">
                                </div>


                                <h2 class="title">
                                    <a href="{{ route('subject', ['id' => $subject->subject_id]) }}">{{ $subject->subject_name }}</a>
                                </h2>



                            </article>
                        </div><!-- End post list item -->
                    @endforeach

                </div><!-- End blog posts list -->


            </div>
        </section><!-- End Blog Section -->

    </main><!-- End #main -->
@stop
