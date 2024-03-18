---
layout: post
title: "유니티 팀 프로젝트 - 일반 과제"
date: 2023-04-09 09:00:00 +0900
image: https://drive.google.com/thumbnail?id=16DtnUKQaymL0m38oQwHf2yjGV4f5zONB
toc: true
categories: [Unity_TP] 
tags: [C#, Unity, Shader]
---

## <unity_h2> 프로젝트 소개 </unity_h2>

대학교 시절 팀 프로젝트 학과 과제 모음입니다. 당시, 처음 유니티를 접했기 때문에 프로젝트를 완성하기 위해서 필요한 부분을 자율적으로 공부 및 코드를 작성하여 발표했던 내용입니다. 코드가 세련되지 않아도 양해해 주시면 감사하겠습니다.  

<br>
<br>

## <unity_h2> 프로젝트 개요 </unity_h2>

- <span><unity_h5>프로젝트명:</unity_h5> 팀 프로젝트 과제</span>
- <span><unity_h5>과제:</unity_h5> 2016년 1학기 팀 프로젝트 일반 과제</span>
- <span><unity_h5>게임 장르:</unity_h5> toy Proejct</span>
- <span><unity_h5>기간:</unity_h5> 제작 완료</span>
    - ver.1: 2016.03.15~2016.05.31
- <span><unity_h5>개발인원:</unity_h5> Developer(1명)</span>
- <span><unity_h5>플랫폼:</unity_h5> PC (Window)</span>

<br>

### <unity_h3> 기술 스택 </unity_h3>

- <span><unity_h5>개발 도구:</unity_h5> Unity 5.3.6.f1 → 2019.4.22f1 / visual stuido </span>
- <span><unity_h5>개발 언어:</unity_h5> C# / mono </span>
- <span><unity_h5>그래픽 디자인:</unity_h5> Adobe Photoshop / Adobe Illustrator / World Creator </span>

<br>
<br>

## <unity_h2> 프로젝트 챕터 </unity_h2>

개인적으로 공부했던 부분을 제작하여 제출한 과제들 입니다.

<br>

### <unity_h3> 모작) 카메라 프로세싱 쉐이더 제작 </unity_h3>

<details markdown=1>
<summary> 나이트 비전 쉐이더 코드 </summary>

```hlsl

Shader "Custom/NightVisionEffectShader" 
{
    //속성창
    Properties 
    {
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _VignetteTex ("Vignette Texture", 2D) = "white"{}
        _ScanLineTex ("Scan Line Texture", 2D) = "white"{}
        _NoiseTex ("Noise Texture", 2D) = "white"{}
        _NoiseXSpeed ("Noise X Speed", Float) = 100.0
        _NoiseYSpeed ("Noise Y Speed", Float) = 100.0
        _ScanLineTileAmount ("Scan Line Tile Amount", Float) = 4.0
        _NightVisionColor ("Night Vision Color", Color) = (1,1,1,1)
        _Contrast ("Contrast", Range(0,4)) = 2
        _Brightness ("Brightness", Range(0,2)) = 1
        _RandomValue ("Random Value", Float) = 0
        _distortion ("Distortion", Float) = 0.2
        _scale ("Scale (Zoom)", Float) = 0.8
    }
    
    SubShader 
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert_img
            #pragma fragment frag
            #pragma fragmentoption ARB_precision_hint_fastest
            #include "UnityCG.cginc"
            
            uniform sampler2D _MainTex;
            uniform sampler2D _VignetteTex;
            uniform sampler2D _ScanLineTex;
            uniform sampler2D _NoiseTex;
            fixed4 _NightVisionColor;
            fixed _Contrast;
            fixed _ScanLineTileAmount;
            fixed _Brightness;
            fixed _RandomValue;
            fixed _NoiseXSpeed;
            fixed _NoiseYSpeed;
            fixed _distortion;
            fixed _scale;
            
            float2 barrelDistortion(float2 coord) 
            {
                // 랜즈 왜곡 알고리즘 참조: http://www.ssontech.com/content/lensalg.htm
                float2 h = coord.xy - float2(0.5, 0.5);
                float r2 = h.x * h.x + h.y * h.y;
                float f = 1.0 + r2 * (_distortion * sqrt(r2));

                return f * _scale * h + 0.5;
            }
            
            //알파값을 가질수 없음
            fixed4 frag(v2f_img i) : COLOR
            {
                //랜더 텍스처의 uv 색상 가저오기
                half2 distortedUV = barrelDistortion(i.uv); //베럴 왜곡(블록렌즈)
                fixed4 renderTex = tex2D(_MainTex, distortedUV);//메인텍스처 입히기
                fixed4 vignetteTex = tex2D(_VignetteTex, i.uv);//줌 모드 텍스쳐 가져오기
                
                //스캔 라인 노이즈 처리
                half2 scanLinesUV = half2(i.uv.x * _ScanLineTileAmount, i.uv.y * _ScanLineTileAmount);//UV 값에  _ScanLineTileAmount 곱하기
                fixed4 scanLineTex = tex2D(_ScanLineTex, scanLinesUV);// 매칭
            
                
                // _SinTime.x == Sin(t/8),  _SinTime.y == Sin(t/4),  _SinTime.z == Sin(t/2), _SinTime.w == Sin(t)
                //시간 단위의 사인 함수 그래프(시간도 차원임으로)
                half2 noiseUV = half2(i.uv.x + (_RandomValue * _SinTime.z * _NoiseXSpeed), i.uv.y + (_Time.x * _NoiseYSpeed));
                fixed4 noiseTex = tex2D(_NoiseTex, noiseUV); //적용
                
                //아날로그 컬러 TV에 사용되는 색을 사용하기 위에 rgb -> YIQ 변환에서 Y 끌어다 오기
                fixed lum = dot (fixed3(0.299, 0.587, 0.0114), renderTex.rgb); // rgb -> Y
                lum += _Brightness; //광도 더해주기
                fixed4 finalColor = (lum *2) + _NightVisionColor; //비전색상값 더하기

                //출력
                finalColor = pow(finalColor, _Contrast); //finalColor^ _Contrast
                finalColor *= vignetteTex; //줌 모드 텍스쳐
                finalColor *= scanLineTex * noiseTex; //노이즈
                finalColor.a = finalColor.r;
                
                return finalColor;
            }
    
            ENDCG
        }
    } 
    FallBack off
}

```

</details>

![나이트비전]({{ site.google_drive }}1C-aUoVIB7C7doYFUnOjISRAboZ3j3m8U{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>나이트비전</unity_h6>*

- FPS를 제작 준비를 하기위해 위해서 포스트 프로세싱을 사용하기로 결정했습니다.
- 카메라에 쉐이더 효과를 부여해서 나이트 비전 제작했습니다.

<br>

### <unity_h3> 모작) 오래된 필름 효과 쉐이더 제작 </unity_h3>

<details markdown=1>
<summary> 오래된 필름 효과 쉐이더 </summary>

```hlsl

Shader "Custom/OldFilmEffectShader"
{
    Properties 
    {
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _VignetteTex ("Vignette Texture", 2D) = "white"{}
        _ScratchesTex ("Scartches Texture", 2D) = "white"{}
        _DustTex ("Dust Texture", 2D) = "white"{}
        _SepiaColor ("Sepia Color", Color) = (1,1,1,1)
        _EffectAmount ("Old Film Effect Amount", Range(0,1)) = 1.0
        _VignetteAmount ("Vignette Opacity", Range(0,1)) = 1.0
        _ScratchesYSpeed ("Scratches Y Speed", Float) = 10.0
        _ScratchesXSpeed ("Scratches X Speed", Float) = 10.0
        _dustXSpeed ("Dust X Speed", Float) = 10.0
        _dustYSpeed ("Dust Y Speed", Float) = 10.0
        _RandomValue ("Random Value", Float) = 1.0
        _Contrast ("Contrast", Float) = 3.0
        
        _distortion ("Distortion", Float) = 0.2
        _cubicDistortion ("Cubic Distortion", Float) = 0.6
        _scale ("Scale (Zoom)", Float) = 0.8
    }
    
    SubShader 
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert_img
            #pragma fragment frag
            #pragma fragmentoption ARB_precision_hint_fastest
            #include "UnityCG.cginc"
            
            uniform sampler2D _MainTex;
            uniform sampler2D _VignetteTex;
            uniform sampler2D _ScratchesTex;
            uniform sampler2D _DustTex;
            fixed4 _SepiaColor;
            fixed _VignetteAmount;
            fixed _ScratchesYSpeed;
            fixed _ScratchesXSpeed;
            fixed _dustXSpeed;
            fixed _dustYSpeed;
            fixed _EffectAmount;
            fixed _RandomValue;
            fixed _Contrast;
            
            float _distortion;
            float _cubicDistortion;
            float _scale;

            float2 barrelDistortion(float2 coord) 
            {
                // 랜즈 왜곡 알고리즘 참조: http://www.ssontech.com/content/lensalg.htm
                float2 h = coord.xy - float2(0.5, 0.5);
                float r2 = h.x * h.x + h.y * h.y;
                float f = 1.0 + r2 * (_distortion + _cubicDistortion * sqrt(r2));

                return f * _scale * h + 0.5;
            }

            //알파값을 가질수 없음
            fixed4 frag(v2f_img i) : COLOR
            {
                //랜더 텍스처의 uv 색상 가저오기
                //half2 distortedUV = barrelDistortion(i.uv); //베럴 왜곡(블록렌즈)
                //half2 waveYUV = half2(i.uv.x, i.uv.y + (_RandomValue * _SinTime.z * 0.003));//사인 함수로 y축 흔들기
                fixed4 renderTex = tex2D(_MainTex, i.uv); //메인텍스쳐
                
                //비네팅 광학사진 주변 텍스쳐 가저오기
                fixed4 vignetteTex = tex2D(_VignetteTex, i.uv);
                
                //스크레치의 픽셀처리
                half2 scratchesUV = half2(i.uv.x + (_RandomValue * _SinTime.z * _ScratchesXSpeed), i.uv.y + (_Time.x * _ScratchesYSpeed)); //x축은 사인함수로 y는 위로
                fixed4 scratchesTex = tex2D(_ScratchesTex, scratchesUV);
                
                //먼지처리
                half2 dustUV = half2(i.uv.x + (_RandomValue * (_SinTime.z * _dustXSpeed)),i.uv.y + (_RandomValue * (_SinTime.z * _dustYSpeed)));
                fixed4 dustTex = tex2D(_DustTex, dustUV);
            
                fixed lum = dot (fixed3(0.299, 0.587, 0.0114), renderTex.rgb); //rgb -> Y

                
                fixed4 finalColor = lum + lerp(_SepiaColor, _SepiaColor + fixed4(0.01f,0.01f,0.01f,1.0f), _RandomValue);  //배경 색상 추가
                finalColor = pow(finalColor, _Contrast); //finalColor^ _Contrast
                
                fixed3 blandingWhite = fixed3(1,1,1); //색을 흔들기 위해서
                
                //출력
                finalColor = lerp(finalColor, finalColor * vignetteTex, _VignetteAmount);
                finalColor.rgb *= lerp(scratchesTex, blandingWhite, (_RandomValue));
                finalColor.rgb *= lerp(dustTex.rgb, blandingWhite, (_RandomValue * _SinTime.z));
                finalColor = lerp(renderTex, finalColor, _EffectAmount);
                
                return finalColor;
            }
    
            ENDCG
        }
    } 
    FallBack off
}


```

</details>

![오래된 필름]({{ site.google_drive }}1WSMPcV5OsFBC-sKsuwBlSnQjtKBgZUip{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>오래된 필름 효과</unity_h6>*

- 인트로 화면 제작 준비를 하기위해 위해서 포스트 프로세싱을 사용하기로 결정했습니다.
- 카메라에 쉐이더 효과를 부여해서 오래된 필름 효과 제작했습니다.

<br>

### <unity_h3> 모작) 파이어볼 스킬 제작 </unity_h3>

마법사 대전 스킬을 만들기 위한 파이어볼 스킬 제작 연구 노트입니다.

- 시간 파이프라인을 제작하여 스킬의 선 딜레이, 후 딜레이 제작하였습니다.

<br>

#### <unity_h4> 펄린 노이즈 제작 </unity_h4>

<details markdown =1>
<summary> 펄린노이즈 C# 코드 </summary>

```c#

//펄린 노이즈(구름등 난수 생성)
float timeAcceleration = 1.5f;
float x = Mathf.PerlinNoise(seed + 0 + Time.time * timeAcceleration, seed + 1 + Time.time * timeAcceleration) - 0.5f; //0,1번
float y = /*firePointLightY +*/ Mathf.PerlinNoise(seed + 2 + Time.time * timeAcceleration, seed + 3 + Time.time * timeAcceleration) - 0.5f; //2,3번
float z = Mathf.PerlinNoise(seed + 4 + Time.time * timeAcceleration, seed + 5 + Time.time * timeAcceleration) - 0.5f; //4 ,5 번
firePointLight.gameObject.transform.localPosition = Vector3.up + new Vector3(x, y, z);

```

</details>  

![펄린 노이즈]({{ site.google_drive }}1KURjFZPvoSVZD_7hTVj1Gv9ICNaXF_lA{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>펄린 노이즈</unity_h6>*

- 펄린 노이즈 난수를 이용한 파이어볼 생성했습니다.

<br>

#### <unity_h4> 스킬 쉐이더 쉐이더 제작 및 physic를 이용한 충돌 처리  </unity_h4>

<details markdown =1>
<summary> 콜라이더 핸들러 인터페이스 C# 코드 </summary>

```c#

namespace FireBall
{
    //콜라이더 핸들러 인터페이스
    public interface ICollisionHandler
    {        
        void HandleCollision(GameObject obj, Collision c);
    }

    public class FireBallCollder : MonoBehaviour
    {
        public ICollisionHandler CollisionHandler; //인터페이스

        public void OnCollisionEnter(Collision col) //충돌트리거에 들어갔을대 알려줌
        {
            CollisionHandler.HandleCollision(gameObject, col);
        }
        // Start is called before the first frame update
        void Start()
        {

        }

        // Update is called once per frame
        void Update()
        {

        }
    }
}

```

</details>

![충돌 처리]({{ site.google_drive }}1Elp_oxSDPyCYybYU5PIykMuMCQEizWJH{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6> 콜라이더 충돌처리</unity_h6>*

- 콜라이더 충돌처리를 사용하여 박스를 부셨습니다.

<br>

#### <unity_h4> 최적화</unity_h4>

<details markdown =1>
<summary> SkillScript C# 코드 </summary>

```c#

namespace FireBall
{

    [System.Serializable]
    public struct RangeOfIntegers
    {
        public int Minimum;
        public int Maximum;
    }

    [System.Serializable]
    public struct RangeOfFloats
    {
        public float Minimum;
        public float Maximum;
    }

    public enum SkillStatePipLine
    {
        error = -1,
        start = 0,
        play = 1,
        end = 2
    }

    public class SkillScript : MonoBehaviour
    {

        [Tooltip("선 딜레이")]
        public float StartTime = 1.0f;

        [Tooltip("후 딜레이")]
        public float StopTime = 3.0f;

        [Tooltip("총 에니메이션 시간")]
        public float Duration = 2.0f;

        [Tooltip("폭발에서 생성할 힘의 크기")]
        public float ForceAmount;

        [Tooltip("힘의 반지름")]
        public float ForceRadius;

        [Tooltip("개체가 투사체")]
        public bool IsProjectile;

        [Tooltip("수동으로 시작해야되며 재생되지 않는 파티클 시스템")]
        public ParticleSystem[] ManualParticleSystems;

        private float startTimeMultiplier; //시작 시간 계수
        private float startTimeCurrent=0.0f; // 시작까지 걸리는 현재 시간 = 선딜레이

        private float stopTimeMultiplier; //정지 시간 계수
        private float stopTimeCurrent=0.0f; // 정지까지 걸리는 현재 시간 = 후딜레이

        public SkillStatePipLine SkillState
        {
            get;
            set;
        }
        public float StartCurrenDelayTime
        {
            get;
            private set;
        }

        public float StopCurrenDelayTime
        {
            get;
            private set;
        }


        protected virtual void Awake()
        {
            SkillState = SkillStatePipLine.start; //시작
            //Starting = true; //시작했는가?
            int fireLayer = UnityEngine.LayerMask.NameToLayer("FireLayer");
        }

        // Start is called before the first frame update
        protected virtual void Start()
        {
            // 프레임에 대해서 사용하기 위해서 계수를 미리 제작
            stopTimeMultiplier = 1.0f / StopTime; //계수
            startTimeMultiplier = 1.0f / StartTime; //계수

            // 이효과가 폭발하면 적용
            CreateExplosion(gameObject.transform.position, ForceRadius, ForceAmount);

            // 파티클 시스템 시작
            StartParticleSystems();

            //콜라이더 핸들 인터페이스에 전달
            //충돌 이벤트연결
            ICollisionHandler handler = (this as ICollisionHandler); //충돌핸들 인터페이스가져오고
            if (handler != null) //충돌 핸들 인터페이스가 존재한다면
            {
                FireBallCollder collision = GetComponentInChildren<FireBallCollder>();
                if (collision != null)
                {
                    collision.CollisionHandler = handler; //자식 오브젝트에 인터페이스 연동
                }
            }

        }

        // 프레임에 따른 시간으로 관리함
        protected virtual void Update()
        {
            Duration -= Time.deltaTime; // 총 에니메이션 시간
            if (SkillState==SkillStatePipLine.end) //정지라면
            {
                stopTimeCurrent += Time.deltaTime; //후 딜레이를 향해 간다.
                if (stopTimeCurrent < StopTime) //후 딜레이가 아니라면
                {
                    StopCurrenDelayTime = stopTimeCurrent * stopTimeMultiplier; //계수를 곱해서 알려줌
                }
            }
            else if (SkillState==SkillStatePipLine.start) // 스킬 상태가 진행중이라면
            {
                startTimeCurrent += Time.deltaTime;
                if (startTimeCurrent < StartTime) //선 딜레이 시간 안됬으면 
                {
                    StartCurrenDelayTime = startTimeCurrent * startTimeMultiplier; 
                }
                else
                {
                    SkillState = SkillStatePipLine.play; //플레이 상태로 변환
                }
            }
            else if (Duration <= 0.0f) //지속시간이 다됬다면 
            {
                Stop();//정지
            }
        }


        private IEnumerator CleanupEverything()
        {
            // 에니메이션과 그래픽이 확인되기 위해서 2초 추가
            yield return new WaitForSeconds(StopTime + 2.0f);
            GameObject.Destroy(gameObject); // 제거
        }

        //파티클 시스템 시작
        private void StartParticleSystems()
        {
            //파티클 시스템 찾기(자식오브젝트에 있는)
            foreach (ParticleSystem p in gameObject.GetComponentsInChildren<ParticleSystem>())
            {
                if (ManualParticleSystems == null || ManualParticleSystems.Length == 0 || System.Array.IndexOf(ManualParticleSystems, p) < 0)
                {
                    if (p.startDelay == 0.0f)
                    {
                        //변경될 수 있음으로 다음프레이까지 대기
                        p.startDelay = 0.01f;
                    }
                    p.Play(); //파티클 시스템 시작하기
                }
            }
        }

        //폭발 생성 위치 반경 힘
        public static void CreateExplosion(Vector3 pos, float radius, float force)
        {
            if (force <= 0.0f || radius <= 0.0f) //힘과 반경이 0보다 작으면 리턴
            {
                return;
            }

            // 주변에 있는 콜라이더를 추출하여 가져오기 (몬스터를 때리면 주변에 있는 몬스터들도 찾아올수 있음)
            Collider[] objects = UnityEngine.Physics.OverlapSphere(pos, radius);
            foreach (Collider h in objects) //모든 콜라이더에게 적용시킴
            {
                Rigidbody r = h.GetComponent<Rigidbody>(); //리지드 바디를 얻어오고
                if (r != null)
                {
                    r.AddExplosionForce(force, pos, radius); //백터반경의 힘을 추가한다.
                }
            }
        }

        public virtual void Stop()
        {
            if (SkillState == SkillStatePipLine.end) //이미 중지단계라면 여기 들어오면 안되니 리턴
            {
                return;
            }
            SkillState = SkillStatePipLine.end; //중지 단계로 만들기

            //파티클 시스템 정리 (중지단계 한번만 사용됨으로 괜찮음)
            foreach (ParticleSystem p in gameObject.GetComponentsInChildren<ParticleSystem>())
            {
                p.Stop();
            }

            StartCoroutine(CleanupEverything()); //지운다.
        }

    
    }
}

```

</details>

<details markdown =1>
<summary> FireBallSystem C# 코드 </summary>

```c#

namespace FireBall
{
    public delegate void FireProjectileCollisionDelegate(FireBallSystem script, Vector3 pos); //파이어볼 콜라이더 델리게이트

    public class FireBallSystem : SkillScript, ICollisionHandler
    {

        [Header("FireBallSystem")]
        [Tooltip("충돌 및 물리에 사용될 개체")]
        public GameObject ColliderObject;

        [Tooltip("충돌시 재생하는 파티클 시스템")]
        public ParticleSystem ExplosionParticleSystem;

        [Tooltip("충돌시 폭발 반경")]
        public float ExplosionRadius = 0.0f;

        [Tooltip("충돌시 폭발하는 힘")]
        public float ExplosionForce = 0.0f;

        [Tooltip("사전에 시전 에니메이션이 있을겨우 전송 지연")]
        public float ColliderDelay = 0.0f;

        [Tooltip("충돌의 속도")]
        public float ColliderSpeed = 0.0f;

        [Tooltip("콜라이더의 진행 방향")]
        public Vector3 Direction = Vector3.forward;

        [Tooltip("콜라이더가 충돌 할 수 있는 레이어")]
        public LayerMask CollisionLayers = Physics.AllLayers;

        [Tooltip("충돌시 파괴되는 파티클 시스템")]
        public ParticleSystem[] DestroyParticleSystemsOnCollision;

        [HideInInspector]
        public FireProjectileCollisionDelegate CollisionDelegate; //델리게이트

        private bool collided=false;

        private IEnumerator PhysicsTransform() //방향 각도 
        {
            yield return new WaitForSeconds(ColliderDelay); //지연시간 후에 시작

            Vector3 dir = Direction * ColliderSpeed; //방향
            dir = ColliderObject.transform.rotation * dir;
            ColliderObject.GetComponent<Rigidbody>().velocity = dir; //한번뿐이니 괜찮음
        }

        // Start is called before the first frame update
        protected override void Start()
        {
            base.Start();
            StartCoroutine(PhysicsTransform()); //콜라이더 이후 딜레이
        }

        public void HandleCollision(GameObject obj, Collision c) //인터페이스 상속받은 콜라이더 충돌시
        {
            if (collided) //충돌중이라면
            {
                return; //충돌 리턴
            }

            collided = true;
            Stop(); //멈추고

            // 파티클 시스템 파괴
            if (DestroyParticleSystemsOnCollision != null)
            {
                foreach (ParticleSystem p in DestroyParticleSystemsOnCollision)
                {
                    GameObject.Destroy(p, 0.01f);// 파티클 제거
                }
            }

            if (ExplosionParticleSystem && ExplosionParticleSystem.gameObject.activeSelf != false && c.contacts.Length != 0)
            {
                ExplosionParticleSystem.transform.position = c.contacts[0].point;
                ExplosionParticleSystem.Play();
                SkillScript.CreateExplosion(c.contacts[0].point, ExplosionRadius, ExplosionForce); //폭발
                if (CollisionDelegate != null) //델리게이트가 있다면
                {
                    CollisionDelegate(this, c.contacts[0].point); //전달
                }
            }
        }
    }
}

```

</details>

![최적화를 위한 파티클 시스템 및 빌보드]({{ site.google_drive }}1SUiNA5qeaFPOjBtoqy4178KUxoMqI9p9{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>최적화를 위한 파티클 시스템 및 빌보드</unity_h6>*

<br>

![파티클 시스템을 이용한 파이어 볼]({{ site.google_drive }}1xdVE23RckX7nrYUXPOhNa2N6EOoqfhsR{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>파티클 시스템을 이용한 파이어 볼</unity_h6>*


- 최적화를 위해서 파티클 시스템에서 텍스쳐를 빌보드로 적용하였습니다.

<br>

#### <unity_h4> 프렉탈 페턴을 입힌 파이어볼 제작 </unity_h4>

<details markdown =1>
<summary> 프렉탈 패턴 shader 코드 </summary>

```hlsl

Shader "Custom/FractalFireBall"
{
    Properties
    {
        _MainTex("Ramp", Rect) = "white"
        _NoiseTex("Noise", 2D) = "grey"
        _Heat("Heat", Float) = 1
        _Radius("Radius", Float) = 1
        _Frequency("Noise Frequency", Float) = 1
        _ScrollSpeed("Noise Scroll Speed", Float) = 1
        _Alpha("Alpha", Float) = 1
    }
    SubShader
    {
        Tags {"Queue" = "Transparent" "RenderType" = "Transparent" "IgnoreProjector" = "True"} //IgnoreProjector프로젝터에 영향을 주지 않음
        LOD 1000

        Pass {
            ColorMask 0
            ZWrite On
            CGPROGRAM
            #pragma target 3.0
            #pragma glsl
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            struct v2f
            {
                float4 vertex : SV_POSITION;
            };

            v2f vert(appdata_base v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex - float4(v.normal * .25, 0)); //로컬좌표를 투영좌표로
                return o;
            }

            half4 frag(v2f i) : COLOR
            {
                return half4(1, 1, 1, 1);
            }

            ENDCG
        }

        Pass
            {
            Blend SrcAlpha OneMinusSrcAlpha //알파블랭딩 1-alpha
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.0
            #pragma glsl
                //#pragma exclude_renderers d3d11_9x	
                #include "UnityCG.cginc"

                #pragma multi_compile QUALITY_HIGH QUALITY_LOW QUALITY_MED
                #pragma multi_compile OCTAVES_1 OCTAVES_2 OCTAVES_3 OCTAVES_4 OCTAVES_5 //순서는 ... 고민
                #pragma multi_compile SCATTERING_ON SCATTERING_OFF

            #if QUALITY_LOW //품질이 낮다면
                #define THRESHOLD .15
                #define PRIMARY 9
                #define SECONDARY 5
                #define HEATSTEP .2
            #elif QUALITY_MED
                #define THRESHOLD .05
                #define PRIMARY 15
                #define SECONDARY 8
                #define HEATSTEP .15
            #elif QUALITY_HIGH
                #define THRESHOLD .02
                #define PRIMARY 25
                #define SECONDARY 10
                #define HEATSTEP .1
            #endif
                sampler2D _MainTex;
                sampler2D _NoiseTex;
                float _Heat;
                float _Radius;
                float _Frequency;
                float _ScrollSpeed;
                float _Alpha;

                //구조체 vertex to float
                struct v2f
                {    //16 +12+12+16 = 56 -> 64 패딩필요
                    float4 vertex : SV_POSITION;
                    float3 worldPos : TEXCOORD0;
                    float3 viewVec : TEXCOORD1;
                    float4 sphere : TEXCOORD2;
                    float2 padding :  TEXCOORD3;
                };

                v2f vert(appdata_base v)
                {
                    v2f o;
                    o.vertex = UnityObjectToClipPos(v.vertex); //투영까지
                    o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz; //월드좌표
                    o.viewVec = WorldSpaceViewDir(v.vertex); //모델좌표-> 월드좌표 방향
                    o.sphere.xyz = mul(unity_ObjectToWorld, float4(0, 0, 0, 1)).xyz; //곱셈 모델의매트릭스 * 알파값의 xyz 값 추출
                    return o;
                }

                float noise(float3 p)
                {
                    // 0.366025404=(sqrt(3) - 1) / 2;
                    // 0.21132486 =(3-sqrt(3))/6;

                    float f = frac(p.y); //소수점 반환 
                    float i = floor(p.y); //내림
                    float2 rg = tex2Dlod(_NoiseTex, float4(p.xz + float2(0.37, 0.21) * i, 0, 0) / 64).xy; //민맵
                    return lerp(rg.x, rg.y, f);
                }

                float fbm(float3 p)  //Fractal noise 노이즈 흐릿해서 보완하기위해
                {
                    p *= _Frequency;
                    float v = 0;
                    float4 offset = _Time * _ScrollSpeed;
                    v += noise(p + offset.y);
                #if OCTAVES_2 | OCTAVES_3 | OCTAVES_4 | OCTAVES_5
                    p *= 2;
                    v += noise(p + offset.z) / 2; p *= 2;
                #endif

                #if OCTAVES_3 | OCTAVES_4 | OCTAVES_5
                    v += noise(p + offset.z) / 4; p *= 2;
                #endif

                #if OCTAVES_4 | OCTAVES_5
                    v += noise(p + offset.w) / 8; p *= 2;
                #endif

                #if OCTAVES_5
                    v += noise(p + offset.w) / 16; p *= 2;
                #endif
                    v = 0.5 + 0.5 * v;
                    return v;
                }

                float distf(float4 sphere, float3 p) {
                    return distance(p, sphere.xyz) - _Radius - fbm(p);
                }

                float4 march(float4 sphere, float3 p, float3 v)
                {
                    float dist;
                    for (int i = 0; i < PRIMARY; ++i) {
                        dist = distf(sphere, p);
                        if (dist < THRESHOLD) return float4(p, 0);
                        p -= v * (dist + .02);
                    }
                    return float4(-100, -100, -100, -100);
                }

                float2 heat(float4 sphere, float3 p, float3 d)
                {
                    float heat = 0;
                    float dens = 0;
                    float fac = .5;
                    d *= HEATSTEP;
                    for (int i = 0; i < SECONDARY; ++i) 
                    {
                        float dis = distf(sphere, p);
                        if (dis <= THRESHOLD) 
                        {
                            heat += pow((_Radius - distance(p, sphere.xyz) + 2.5) * fac * _Heat, 3);
                            fac *= .25;
                            dens += HEATSTEP * 2;
                            p -= d;
                        }
                        else 
                        {
                            p -= d * 3;
                        }

                    }
                return float2(heat, dens);
                }

            half4 frag(v2f i) : COLOR
            {
                float4 m = march(i.sphere, i.worldPos, normalize(i.viewVec));

                #if SCATTERING_OFF
                float heatfac = smoothstep(_Radius + .5, _Radius + 1.5, distance(m.xyz, i.sphere.xyz)) / _Heat;
                half4 col = tex2Dlod(_MainTex, float4(1 - heatfac, 0, 0, 0));
                col.w = saturate(_Alpha);
                #elif SCATTERING_ON
                float2 hd = heat(i.sphere, m.xyz, normalize(i.viewVec));
                half4 col = tex2Dlod(_MainTex, float4(hd.x, 0, 0, 0));
                col.w = saturate(saturate(hd.y) * _Alpha);
                #endif
                clip(m.w);
                return col;
            }
            ENDCG
        }
    }
    FallBack off
}

```

</details>

<details markdown =1>
<summary> 프렉탈 패턴 시스템 C# 코드 </summary>

```c#

namespace FireBall
{
    public delegate void FractalFireCollisionDelegate(FractalFireBallSystem script, Vector3 pos);
    public class FractalFireBallSystem : SkillScript, ICollisionHandler
    {
    [Header("FireBallSystem")]
        [Tooltip("충돌 및 물리에 사용될 개체")]
        public GameObject ColliderObject;

        [Tooltip("충돌시 재생되는 소리")]
        public AudioSource CollisionSound;

        [Tooltip("충돌시 재생하는 파티클 시스템")]
        public ParticleSystem ExplosionParticleSystem;

        [Tooltip("충돌시 폭발 반경")]
        public float ExplosionRadius = 0.0f;

        [Tooltip("충돌시 폭발하는 힘")]
        public float ExplosionForce = 0.0f;

        [Tooltip("사전에 시전 에니메이션이 있을겨우 전송 지연")]
        public float ColliderDelay = 0.0f;

        [Tooltip("충돌의 속도")]
        public float ColliderSpeed = 0.0f;

        [Tooltip("콜라이더의 진행 방향")]
        public Vector3 Direction = Vector3.forward;

        [Tooltip("콜라이더가 충돌 할 수 있는 레이어")]
        public LayerMask CollisionLayers = Physics.AllLayers;

        [Tooltip("충돌시 파괴되는 게임오브젝트")]
        public GameObject[] DestroyGameObjectOnCollision;

        [HideInInspector]
        public FractalFireCollisionDelegate CollisionDelegate; //델리게이트

        private bool collided=false;

        private IEnumerator PhysicsTransform() //방향 각도 
        {
            yield return new WaitForSeconds(ColliderDelay); //지연시간 후에 시작

            Vector3 dir = Direction * ColliderSpeed; //방향
            dir = ColliderObject.transform.rotation * dir;
            ColliderObject.GetComponent<Rigidbody>().velocity = dir; //한번뿐이니 괜찮음
            foreach (GameObject o in DestroyGameObjectOnCollision)
            {
                o.GetComponent<Rigidbody>().velocity = dir;
            }
        }

        // Start is called before the first frame update
        protected override void Start()
        {
            base.Start();
            StartCoroutine(PhysicsTransform()); //콜라이더 이후 딜레이
        }

        public void HandleCollision(GameObject obj, Collision c) //인터페이스 상속받은 콜라이더 충돌시
        {
            if (collided) //충돌중이라면
            {
                return; //충돌 리턴
            }

            collided = true;
            Stop(); //멈추고

            // 오브젝트 파괴
            if (DestroyGameObjectOnCollision != null)
            {
                foreach (GameObject o in DestroyGameObjectOnCollision)
                {
                    GameObject.Destroy(o, 0.01f);// 오브젝트파괴
                }
            }

            if (CollisionSound != null)
            {
                CollisionSound.Play(); //충돌 소리 재생
            }

            if (ExplosionParticleSystem && ExplosionParticleSystem.gameObject.activeSelf != false && c.contacts.Length != 0)
            {
                ExplosionParticleSystem.transform.position = c.contacts[0].point;
                ExplosionParticleSystem.Play();
                SkillScript.CreateExplosion(c.contacts[0].point, ExplosionRadius, ExplosionForce); //폭발
                if (CollisionDelegate != null) //델리게이트가 있다면
                {
                    CollisionDelegate(this, c.contacts[0].point); //전달
                }
            }
        }
    }
}

```

</details>


![프렉탈 패턴을 입힌 파이어볼]({{ site.google_drive }}1aa4IR0lYiWufqqEmy7L0Dm8KfTzb4w4X{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>프렉탈 패턴을 입힌 파이어볼</unity_h6>*

- 택스쳐 대신 프렉탈 패턴을 이용한 쉐이더 FX를 이용한 파이어볼 제작하였습니다.(파티클 시스템 X)


<br>

#### <unity_h4> 충돌 후 폭발 파티클 적용 </unity_h4>

![충돌 후 폭발 파티클 적용]({{ site.google_drive }}1kaXvofk0-I2jQaj_zOdKaFCZJhs0e4PZ{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>충돌 후 폭발 파티클 적용</unity_h6>*

![Fx 폭발 파티클 적용]({{ site.google_drive }}1qC10aQYLryGzkhfUqTSbCJs-NLKrGZpK{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>Fx 폭발 파티클 적용</unity_h6>*

- 후속 폭발 효과 적용하였습니다.

<br>

### <unity_h3> 인스펙터 에디터창 변경</unity_h3>

<details markdown =1>
<summary> 인스팩처 창 코드 </summary>

```c#

namespace FireBall
{
    [CustomEditor(typeof(FractalFireBall))]
    [CanEditMultipleObjects]
    public class FractaFireBallEditor : Editor
    {
        bool materialAdvence = false;

        SerializedProperty mainTex;
        SerializedProperty noiseTex;
        SerializedProperty material;

        SerializedProperty heat;
        SerializedProperty alpha;

        SerializedProperty speed;
        SerializedProperty frequency;
        SerializedProperty scattering;

        SerializedProperty octaves;
        int[] octaveNums = { 1, 2, 3, 4, 5 };
        GUIContent[] octaveStrings = { new GUIContent("옥타브_1"), new GUIContent("옥타브_2"), new GUIContent("옥타브_3"), new GUIContent("옥타브_4"), new GUIContent("옥타브_5") };

        SerializedProperty quality;
        int[] qualityNums = { 0, 1, 2 };
        GUIContent[] qualityStrings = { new GUIContent("낮음"), new GUIContent("중간"), new GUIContent("높음") };

        public void OnEnable()
    {
            mainTex = serializedObject.FindProperty("TextureColor");
            noiseTex = serializedObject.FindProperty("Noise");
            material = serializedObject.FindProperty("Material");

            heat = serializedObject.FindProperty("Heat");
            alpha = serializedObject.FindProperty("Alpha");

            speed = serializedObject.FindProperty("Speed");
            frequency = serializedObject.FindProperty("Frequency");
            scattering = serializedObject.FindProperty("Scattering");

            octaves = serializedObject.FindProperty("Octaves");
            quality = serializedObject.FindProperty("Octaves");
        }

        public override void OnInspectorGUI()
        {
            FractalFireBall Mat = (FractalFireBall)target;
            serializedObject.Update();
            EditorGUI.BeginChangeCheck();

            EditorGUILayout.Space();
            if(materialAdvence = EditorGUILayout.Foldout(materialAdvence, "머테리얼"))
            {
                EditorGUILayout.PropertyField(mainTex, new GUIContent("그라데이션"));
                EditorGUILayout.PropertyField(noiseTex, new GUIContent("노멀맵(노이즈)"));
                EditorGUILayout.PropertyField(material, new GUIContent("머테리얼"));
            }


            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Tip) 검정 <-- 1=빨강 --> 흰색 ");
            EditorGUILayout.PropertyField(heat, new GUIContent("온도"));
            EditorGUILayout.Slider(alpha, 0, 1, new GUIContent("알파 값"));

            EditorGUILayout.Space();
            EditorGUILayout.PropertyField(speed, new GUIContent("노이즈 스피드"));
            EditorGUILayout.PropertyField(frequency, new GUIContent("노이즈 빈도"));
            EditorGUILayout.PropertyField(scattering, new GUIContent("노이즈 산란"));

            EditorGUILayout.Space();
            EditorGUILayout.LabelField("Tip) 옥타브 = 화면의 프리퀀시(진동수)나 구체의 정도 조절");
            EditorGUILayout.IntPopup(octaves, octaveStrings, octaveNums, new GUIContent("옥타브"));
            EditorGUILayout.IntPopup(quality, qualityStrings, qualityNums, new GUIContent("품질"));
            serializedObject.ApplyModifiedProperties();

            //셰이더 업데이트를 위해서
            if (EditorGUI.EndChangeCheck() || Event.current.commandName == "UndoRedoPerformed") //undo(취소) 이벤트 확인
            {
                Mat.ShaderProperties();
            }

        }
    }
}

```

</details>

![인스펙터 에디터창 변경]({{ site.google_drive }}1ErRp0cfeH7WEm5OL24T-zlU8LVuwNYe6{{ site.google_drive_end }}){:width="100%" height="auto" loading="lazy"}
*<unity_h6>인스펙터 에디터창 변경</unity_h6>*

- 이 파트는 교수님의 과제로 인하여 만들었지만, 당시에는 만드는 이유를 알 수가 없었습니다.
- 쉐이더 코드를 활용하기 위해서 인스팩터창을 개조하였습니다.
    
<br>

### <unity_h3> 유니티 로그인 화면 UI 제작 및 데이터 베이스 조회 </unity_h3>

<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/q3Xq106qzb4" title="팀프로젝트 과제 - 네트워크" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


- 유니티 로그인 + PHP + MySql 쿼리문으로 데이터베이스 조회 코드 입니다.: [https://youtu.be/q3 Xq106 qzb4](https://youtu.be/q3 Xq106 qzb4)

<br>
<br>

## <unity_h2> 비고 및 여담 </unity_h2>

- 카메라 프로세싱 과정에 대해서 이해하고 유니티 쉐이더를 이용하여 코드를 작성할 수 있게 되었습니다.
- 프렉탈 패턴과 파티클 빌보드의 성능을 비교해 보고 실시간과 성능의 차이에 대해 이해할 수 있게 되었습니다.
- 쿼리문으로 데이터베이스를 조회해서 로그인 처리 하는 방법에 대해서 학습했습니다.