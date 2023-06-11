@extends('top.app')
@section('content')

    @include('top.topnav')

    <section id="home" class="home">
        <div class="container position-relative">
            <div class="row gy-5" data-aos="fade-in">
                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                    <h2>Welcome to <span>Live To Learn</span></h2>
                    <p>Redefine How You Learn With More And More Fun.</p>
                    <div class="d-flex justify-content-center justify-content-lg-start">
                        <a href="#learn" class="btn-get-started">Get Started</a>
                        {{-- <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a> --}}
                    </div>
                </div>
                <div class="col-lg-6 order-1 order-lg-2">
                    <img src="/img/hero-img.svg" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="100">
                </div>
            </div>
        </div>
        <div>
            <div class="icon-boxes position-relative">
                <div class="container position-relative">
                    <div class="row gy-4 mt-5">

                        <div class="registration-form ">
                            <form action="{{ route('summarySubmit') }}" class="form-group" method="post"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-icon">
                                    <span><i class="bi bi-laptop-fill"></i></span>
                                </div>

                                <div class="form-group">
                                    <input type="text" class="form-control item" id="title" name="title"
                                        value="{{ old('title') }}" placeholder="Title">
                                </div>
                                @error('title')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <div class="form-group">
                                    <input type="file" class="form-control item" id="image" name="image"
                                        placeholder="Upload Image">
                                </div>
                                @error('image')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror

                                <div class="form-group">
                                    <textarea class="form-control item" id="detail" name="detail" value="{{ old('detail') }}" placeholder="Details.."></textarea>
                                </div>
                                @error('detail')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror


                                <br>
                                <input type="submit" class="btn btn-block create-account" value="Done">

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>

    <main id="main">

        <!-- ======= Recent Blog Posts Section ======= -->
        <section id="recent-posts" class="recent-posts sections-bg">
            <div class="container" data-aos="fade-up">

                <div class="section-header">
                    <h2>Summary Gallery</h2>
                    <p>From Most Recent To Least</p>
                </div>

                <div class="row gy-4">
                    @foreach ($summaries as $summary)
                        <div class="col-xl-4 col-md-6">
                            <article>

                                <div class="post-img">
                                    <img src="{{ asset('/storage/summary/' . $summary->image) }}" alt=""
                                        class="img-fluid">
                                </div>

                                <h2 class="title">
                                    <a href="{{ route('summaryDetail', ['id' => $summary->summary_id]) }}">{{ $summary->title }}</a>
                                </h2>

                                <div class="d-flex align-items-center">
                                    <div class="post-meta">
                                      <p class="post-author-list">{{ $summary->student->name }}</p>
                                    </div>
                                  </div>
                            </article>
                        </div><!-- End post list item -->
                    @endforeach

                </div><!-- End recent posts list -->

            </div>
        </section><!-- End Recent Blog Posts Section -->

    </main><!-- End #main -->
@stop
