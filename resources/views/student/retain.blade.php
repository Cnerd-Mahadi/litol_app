@extends('top.app')
@include('top.topnav')
@section('content')
    <main id="main">

        <!-- ======= Blog Section ======= -->
        <section id="blog" class="blog">
            <div class="container" data-aos="fade-up">

                <div class="row gy-4 posts-list">
                        <div class="col-xl-4 col-md-6">
                            <article>

                                <div class="post-img">
                                    <img src="{{ asset('img/retain_summary.jpg') }}"
                                        alt="" class="img-fluid">
                                </div>


                                <h2 class="title">
                                    <a href="{{ route('summary') }}">Summary</a>
                                </h2>



                            </article>
                        </div><!-- End post list item -->

                </div><!-- End blog posts list -->


            </div>
        </section><!-- End Blog Section -->

    </main><!-- End #main -->
@stop
