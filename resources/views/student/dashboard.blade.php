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
                        <a href="{{ route('studentDash') }}" class="btn-get-started">Get Started</a>
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

                        <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div class="icon-box">
                                <div class="icon"><i class="bi bi-easel"></i></div>
                                <h4 class="title"><a href="{{ route('learn') }}" class="stretched-link">Learn Section</a></h4>
                            </div>
                        </div>
                        <!--End Icon Box -->

                        <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div class="icon-box">
                                <div class="icon"><i class="bi bi-gem"></i></div>
                                <h4 class="title"><a href="{{ route('retain') }}" class="stretched-link">Retention Center</a></h4>
                            </div>
                        </div>
                        <!--End Icon Box -->

                        <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div class="icon-box">
                                <div class="icon"><i class="bi bi-gem"></i></div>
                                <h4 class="title"><a href="{{ route('request') }}" class="stretched-link">Request Gallery</a></h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
@stop
